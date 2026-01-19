/**
 * Servicio de Supabase - CRM B2C
 * Gestión completa de leads, conversaciones, y estudiantes
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ============================================================================
// TIPOS DE DATOS
// ============================================================================

export interface Lead {
  id?: string;
  nombre: string;
  email: string;
  telefono: string;
  perfil_profesional?: string;
  empresa?: string;
  cargo?: string;
  formacion_previa?: string;
  lead_score?: number;
  temperatura?: 'frio' | 'tibio' | 'caliente';
  interes_nivel?: 'bajo' | 'medio' | 'alto' | 'muy_alto';
  status?: string;
  source: string;
  landing_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  course_id?: string;
  modalidad_preferida?: string;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  assigned_to?: string;
}

export interface Conversation {
  id?: string;
  lead_id: string;
  channel: 'whatsapp' | 'email' | 'phone' | 'chat_web';
  channel_identifier?: string;
  status?: 'active' | 'closed' | 'archived';
  subject?: string;
  started_by?: 'lead' | 'agent';
  agent_name?: string;
  ai_handled?: boolean;
  ai_model?: string;
  ai_prompt_version?: string;
}

export interface Message {
  id?: string;
  conversation_id: string;
  content: string;
  message_type?: 'text' | 'image' | 'audio' | 'video' | 'document';
  direction: 'incoming' | 'outgoing';
  sender_name?: string;
  external_id?: string;
  ai_generated?: boolean;
  ai_confidence?: number;
  ai_intent?: string;
  ai_sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface Activity {
  id?: string;
  lead_id: string;
  activity_type: string;
  title?: string;
  description?: string;
  metadata?: Record<string, any>;
  created_by?: string;
  conversation_id?: string;
  appointment_id?: string;
}

export interface AnalyticsEvent {
  id?: string;
  lead_id?: string;
  session_id?: string;
  anonymous_id?: string;
  event_name: string;
  event_category?: string;
  properties?: Record<string, any>;
  page_url?: string;
  page_title?: string;
  referrer?: string;
  ip_address?: string;
  user_agent?: string;
  device_type?: string;
  browser?: string;
  os?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

// ============================================================================
// CLASE SUPABASE SERVICE
// ============================================================================

class SupabaseService {
  private supabase: SupabaseClient | null = null;
  private supabaseUrl: string;
  private supabaseAnonKey: string;

  constructor() {
    this.supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
    this.supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  }

  /**
   * Valida que Supabase esté configurado
   */
  private validateConfig(): boolean {
    if (!this.supabaseUrl || !this.supabaseAnonKey) {
      console.warn('⚠️ Supabase no configurado. Revisa tu archivo .env');
      return false;
    }
    return true;
  }

  /**
   * Inicializa el cliente de Supabase
   */
  private getClient(): SupabaseClient | null {
    if (!this.validateConfig()) {
      return null;
    }

    if (!this.supabase) {
      this.supabase = createClient(this.supabaseUrl, this.supabaseAnonKey);
    }

    return this.supabase;
  }

  // ==========================================================================
  // LEADS
  // ==========================================================================

  /**
   * Crea un nuevo lead en Supabase
   */
  async createLead(leadData: Lead): Promise<{ success: boolean; data?: any; error?: string }> {
    const client = this.getClient();
    if (!client) {
      return { success: false, error: 'Supabase no configurado' };
    }

    try {
      // Enriquecer con datos del navegador
      const enrichedLead = {
        ...leadData,
        ip_address: await this.getClientIP(),
        user_agent: navigator.userAgent,
        referrer: document.referrer || undefined,
        status: leadData.status || 'nuevo_lead',
        temperatura: leadData.temperatura || 'frio',
        lead_score: this.calculateLeadScore(leadData),
      };

      const { data, error } = await client
        .from('leads')
        .insert(enrichedLead)
        .select()
        .single();

      if (error) {
        console.error('❌ Error al crear lead en Supabase:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ Lead creado en Supabase:', data);

      // Registrar actividad
      await this.createActivity({
        lead_id: data.id,
        activity_type: 'form_submitted',
        title: 'Formulario enviado',
        description: `Lead registrado desde ${leadData.source}`,
        created_by: 'system',
      });

      return { success: true, data };
    } catch (error) {
      console.error('❌ Error al crear lead:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  /**
   * Actualiza un lead existente
   */
  async updateLead(
    leadId: string,
    updates: Partial<Lead>
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    const client = this.getClient();
    if (!client) {
      return { success: false, error: 'Supabase no configurado' };
    }

    try {
      const { data, error } = await client
        .from('leads')
        .update(updates)
        .eq('id', leadId)
        .select()
        .single();

      if (error) {
        console.error('❌ Error al actualizar lead:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ Lead actualizado:', data);
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  /**
   * Busca un lead por email
   */
  async getLeadByEmail(email: string): Promise<{ success: boolean; data?: any; error?: string }> {
    const client = this.getClient();
    if (!client) {
      return { success: false, error: 'Supabase no configurado' };
    }

    try {
      const { data, error } = await client
        .from('leads')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No encontrado
          return { success: true, data: null };
        }
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  /**
   * Actualiza el status de un lead
   */
  async updateLeadStatus(
    leadId: string,
    newStatus: string,
    reason?: string
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    const updates: any = {
      status: newStatus,
      last_contact_at: new Date().toISOString(),
    };

    if (reason) {
      updates.status_reason = reason;
    }

    // Actualizar fechas especiales según el status
    if (newStatus === 'calificado') {
      updates.qualified_at = new Date().toISOString();
    } else if (newStatus === 'ganado') {
      updates.converted_at = new Date().toISOString();
    } else if (newStatus === 'perdido') {
      updates.lost_at = new Date().toISOString();
    }

    const result = await this.updateLead(leadId, updates);

    if (result.success) {
      // Registrar actividad
      await this.createActivity({
        lead_id: leadId,
        activity_type: 'status_changed',
        title: `Status actualizado a ${newStatus}`,
        description: reason,
        created_by: 'system',
      });
    }

    return result;
  }

  // ==========================================================================
  // CONVERSACIONES
  // ==========================================================================

  /**
   * Crea una nueva conversación
   */
  async createConversation(
    conversationData: Conversation
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    const client = this.getClient();
    if (!client) {
      return { success: false, error: 'Supabase no configurado' };
    }

    try {
      const { data, error } = await client
        .from('conversations')
        .insert(conversationData)
        .select()
        .single();

      if (error) {
        console.error('❌ Error al crear conversación:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ Conversación creada:', data);

      // Registrar actividad
      await this.createActivity({
        lead_id: conversationData.lead_id,
        activity_type: `${conversationData.channel}_conversation_started`,
        title: `Conversación iniciada por ${conversationData.channel}`,
        conversation_id: data.id,
        created_by: conversationData.started_by === 'agent' ? 'agent' : 'system',
      });

      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  /**
   * Agrega un mensaje a una conversación
   */
  async createMessage(
    messageData: Message
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    const client = this.getClient();
    if (!client) {
      return { success: false, error: 'Supabase no configurado' };
    }

    try {
      const { data, error } = await client
        .from('messages')
        .insert(messageData)
        .select()
        .single();

      if (error) {
        console.error('❌ Error al crear mensaje:', error);
        return { success: false, error: error.message };
      }

      // Actualizar stats de la conversación
      await this.updateConversationStats(messageData.conversation_id);

      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  /**
   * Actualiza las estadísticas de una conversación
   */
  private async updateConversationStats(conversationId: string): Promise<void> {
    const client = this.getClient();
    if (!client) return;

    try {
      // Contar mensajes
      const { count: totalMessages } = await client
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('conversation_id', conversationId);

      const { count: messagesFromLead } = await client
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('conversation_id', conversationId)
        .eq('direction', 'incoming');

      const { count: messagesFromAgent } = await client
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('conversation_id', conversationId)
        .eq('direction', 'outgoing');

      // Actualizar conversación
      await client
        .from('conversations')
        .update({
          total_messages: totalMessages || 0,
          messages_from_lead: messagesFromLead || 0,
          messages_from_agent: messagesFromAgent || 0,
          last_message_at: new Date().toISOString(),
        })
        .eq('id', conversationId);
    } catch (error) {
      console.error('❌ Error al actualizar stats de conversación:', error);
    }
  }

  // ==========================================================================
  // ACTIVIDADES
  // ==========================================================================

  /**
   * Registra una actividad en el timeline del lead
   */
  async createActivity(
    activityData: Activity
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    const client = this.getClient();
    if (!client) {
      return { success: false, error: 'Supabase no configurado' };
    }

    try {
      const { data, error } = await client
        .from('activities')
        .insert(activityData)
        .select()
        .single();

      if (error) {
        console.error('❌ Error al crear actividad:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  // ==========================================================================
  // ANALYTICS
  // ==========================================================================

  /**
   * Registra un evento de analytics
   */
  async trackEvent(
    eventData: AnalyticsEvent
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    const client = this.getClient();
    if (!client) {
      return { success: false, error: 'Supabase no configurado' };
    }

    try {
      // Enriquecer con datos del navegador
      const enrichedEvent = {
        ...eventData,
        page_url: eventData.page_url || window.location.href,
        page_title: eventData.page_title || document.title,
        referrer: eventData.referrer || document.referrer || undefined,
        user_agent: eventData.user_agent || navigator.userAgent,
        device_type: this.getDeviceType(),
      };

      const { data, error } = await client
        .from('analytics_events')
        .insert(enrichedEvent)
        .select()
        .single();

      if (error) {
        console.error('❌ Error al registrar evento:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  // ==========================================================================
  // UTILIDADES
  // ==========================================================================

  /**
   * Calcula el lead score basado en datos del lead
   */
  private calculateLeadScore(lead: Lead): number {
    let score = 0;

    // +20 si tiene perfil profesional relevante
    if (
      lead.perfil_profesional &&
      ['profesional_finanzas', 'consultor'].includes(lead.perfil_profesional)
    ) {
      score += 20;
    }

    // +15 si tiene empresa y cargo
    if (lead.empresa && lead.cargo) {
      score += 15;
    }

    // +10 si tiene formación previa relevante
    if (lead.formacion_previa) {
      score += 10;
    }

    // +10 por source de alta calidad
    if (['referral', 'linkedin', 'google_ads'].includes(lead.source)) {
      score += 10;
    }

    // +5 si especificó modalidad preferida
    if (lead.modalidad_preferida) {
      score += 5;
    }

    return Math.min(score, 100);
  }

  /**
   * Obtiene la IP del cliente (requiere servicio externo)
   */
  private async getClientIP(): Promise<string | undefined> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.warn('No se pudo obtener IP del cliente');
      return undefined;
    }
  }

  /**
   * Detecta el tipo de dispositivo
   */
  private getDeviceType(): string {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'mobile';
    }
    return 'desktop';
  }

  /**
   * Extrae UTM parameters de la URL
   */
  getUTMParams(): {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
  } {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || undefined,
      utm_medium: params.get('utm_medium') || undefined,
      utm_campaign: params.get('utm_campaign') || undefined,
      utm_content: params.get('utm_content') || undefined,
      utm_term: params.get('utm_term') || undefined,
    };
  }
}

// Exportar instancia singleton
export const supabaseService = new SupabaseService();
