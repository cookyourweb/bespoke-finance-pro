/**
 * SUPABASE EDGE FUNCTION: WhatsApp Webhook Handler
 *
 * Handles incoming WhatsApp messages from Twilio/360Dialog
 * Processes them with AI agent and saves to database
 *
 * To deploy:
 * 1. Install Supabase CLI: npm install -g supabase
 * 2. Login: supabase login
 * 3. Link project: supabase link --project-ref your-project-ref
 * 4. Deploy: supabase functions deploy whatsapp-webhook
 *
 * Set environment variables in Supabase Dashboard:
 * - OPENAI_API_KEY
 * - TWILIO_ACCOUNT_SID
 * - TWILIO_AUTH_TOKEN
 * - TWILIO_WHATSAPP_NUMBER
 * - BREVO_API_KEY (optional)
 */

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Constants
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')!;
const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID')!;
const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN')!;
const TWILIO_WHATSAPP_NUMBER = Deno.env.get('TWILIO_WHATSAPP_NUMBER')!;

// Agent Prompt - CARGA DESDE ARCHIVO O CONFIGURA AQUÍ
const AGENT_PROMPT = `
Eres el agente de WhatsApp de Bespoke School of Finance.
Tu único objetivo es AGENDAR CITAS con potenciales alumnos.
[... resto del prompt del archivo WHATSAPP_AGENT_PROMPT.md ...]
`.trim();

serve(async (req) => {
  try {
    // CORS headers
    if (req.method === 'OPTIONS') {
      return new Response('ok', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Parse incoming webhook from Twilio
    const formData = await req.formData();
    const From = formData.get('From')?.toString();
    const Body = formData.get('Body')?.toString();
    const MessageSid = formData.get('MessageSid')?.toString();

    if (!From || !Body) {
      return new Response('Missing required fields', { status: 400 });
    }

    console.log(`📱 Mensaje de ${From}: ${Body}`);

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // 1. Buscar o crear lead por teléfono
    let { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('telefono', From)
      .single();

    if (leadError && leadError.code !== 'PGRST116') {
      throw leadError;
    }

    // Si no existe el lead, crearlo
    if (!lead) {
      const { data: newLead, error: createError } = await supabase
        .from('leads')
        .insert({
          telefono: From,
          nombre: 'WhatsApp Lead',
          email: `whatsapp-${From.replace(/[^0-9]/g, '')}@temp.com`,
          source: 'whatsapp',
          status: 'nuevo_lead',
          temperatura: 'caliente',
        })
        .select()
        .single();

      if (createError) throw createError;
      lead = newLead;
      console.log(`✅ Nuevo lead creado: ${lead.id}`);
    }

    // 2. Buscar o crear conversación activa
    let { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('*')
      .eq('lead_id', lead.id)
      .eq('channel', 'whatsapp')
      .eq('status', 'active')
      .single();

    if (convError && convError.code !== 'PGRST116') {
      throw convError;
    }

    if (!conversation) {
      const { data: newConv, error: createConvError } = await supabase
        .from('conversations')
        .insert({
          lead_id: lead.id,
          channel: 'whatsapp',
          channel_identifier: From,
          status: 'active',
          started_by: 'lead',
          ai_handled: true,
          ai_model: 'gpt-4',
          ai_prompt_version: '1.0',
        })
        .select()
        .single();

      if (createConvError) throw createConvError;
      conversation = newConv;
      console.log(`✅ Nueva conversación creada: ${conversation.id}`);
    }

    // 3. Guardar mensaje entrante
    await supabase.from('messages').insert({
      conversation_id: conversation.id,
      content: Body,
      direction: 'incoming',
      external_id: MessageSid,
      sender_name: lead.nombre,
    });

    // 4. Obtener historial de mensajes para contexto
    const { data: messageHistory } = await supabase
      .from('messages')
      .select('content, direction, sent_at')
      .eq('conversation_id', conversation.id)
      .order('sent_at', { ascending: true })
      .limit(10);

    // 5. Construir mensajes para OpenAI
    const messages = [
      { role: 'system', content: AGENT_PROMPT },
      ...(messageHistory?.map((msg) => ({
        role: msg.direction === 'incoming' ? 'user' : 'assistant',
        content: msg.content,
      })) || []),
    ];

    // 6. Llamar a OpenAI
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI error: ${await openaiResponse.text()}`);
    }

    const aiData = await openaiResponse.json();
    const aiReply = aiData.choices[0].message.content;

    console.log(`🤖 Respuesta IA: ${aiReply}`);

    // 7. Guardar respuesta del agente
    await supabase.from('messages').insert({
      conversation_id: conversation.id,
      content: aiReply,
      direction: 'outgoing',
      ai_generated: true,
      ai_confidence: 0.9,
    });

    // 8. Enviar respuesta por Twilio
    const twilioResponse = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: TWILIO_WHATSAPP_NUMBER,
          To: From,
          Body: aiReply,
        }),
      }
    );

    if (!twilioResponse.ok) {
      throw new Error(`Twilio error: ${await twilioResponse.text()}`);
    }

    console.log(`✅ Mensaje enviado a ${From}`);

    // 9. Actualizar estadísticas de la conversación
    await supabase
      .from('conversations')
      .update({
        last_message_at: new Date().toISOString(),
        total_messages: (conversation.total_messages || 0) + 2,
      })
      .eq('id', conversation.id);

    // 10. Registrar actividad
    await supabase.from('activities').insert({
      lead_id: lead.id,
      activity_type: 'whatsapp_message',
      title: 'Mensaje de WhatsApp',
      description: Body.substring(0, 100),
      conversation_id: conversation.id,
      created_by: 'ai_agent',
    });

    // TODO: Detectar si el agente capturó email/nombre y actualizar el lead
    // TODO: Detectar si se agendó una cita y crear registro en appointments
    // TODO: Sincronizar con Brevo si se actualizó info del lead

    return new Response(JSON.stringify({ success: true, leadId: lead.id }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Error en webhook:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
