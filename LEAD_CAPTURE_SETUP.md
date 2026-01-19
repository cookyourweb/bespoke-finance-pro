# 🚀 Guía de Configuración - Sistema de Captura de Leads

Esta guía te ayudará a configurar el sistema completo de captura de leads con integración a Brevo CRM y WhatsApp.

---

## 📋 Índice

1. [Visión General](#visión-general)
2. [Configuración de Brevo](#configuración-de-brevo)
3. [Configuración de WhatsApp](#configuración-de-whatsapp)
4. [Variables de Entorno](#variables-de-entorno)
5. [Agente de WhatsApp](#agente-de-whatsapp)
6. [Pruebas](#pruebas)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Visión General

### Flujo de Captura de Leads

```
Usuario llena formulario en landing page
           ↓
Datos guardados en localStorage (backup)
           ↓
Contacto creado/actualizado en Brevo CRM
           ↓
Usuario recibe confirmación por email
           ↓
Opción de agendar llamada por WhatsApp
           ↓
Agente de WhatsApp gestiona la conversación
           ↓
Cita agendada con datos confirmados
```

### Componentes Implementados

- ✅ **Formulario de captura** (email + teléfono)
- ✅ **Servicio de Brevo** (registro de contactos en CRM)
- ✅ **Servicio de WhatsApp** (redirección y mensajes)
- ✅ **Agente de WhatsApp** (prompt profesional para agendar citas)
- ✅ **Backup local** (localStorage como fallback)

---

## 🔧 Configuración de Brevo

### Paso 1: Obtener API Key

1. Inicia sesión en [Brevo](https://app.brevo.com/)
2. Ve a **Settings** → **API Keys**
3. Crea una nueva API Key con nombre "Bespoke Finance Lead Capture"
4. Copia la API Key generada

### Paso 2: Crear o Identificar Lista de Contactos

1. Ve a **Contacts** → **Lists**
2. Crea una nueva lista llamada "Leads - Bespoke Finance" o usa una existente
3. Anota el **List ID** (lo encontrarás en la URL o en los detalles de la lista)

### Paso 3: Configurar Atributos Personalizados (Opcional pero Recomendado)

Ve a **Contacts** → **Contact Attributes** y crea los siguientes atributos personalizados:

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| `NOMBRE` | Text | Nombre completo del lead |
| `SMS` | Text | Teléfono de contacto |
| `PERFIL` | Text | Perfil profesional |
| `MODALIDAD` | Text | Modalidad de asistencia preferida |
| `STATUS` | Text | Status en el pipeline de ventas |
| `FECHA_REGISTRO` | Date | Fecha de registro del lead |
| `FECHA_ACTUALIZACION` | Date | Última actualización |

### Paso 4: Configurar Automatizaciones (Opcional)

Puedes crear automatizaciones en Brevo para:

- 📧 Enviar email de bienvenida automático
- 📧 Email de seguimiento después de 24h si no responde
- 📧 Email recordatorio de llamada agendada
- 📊 Notificar al equipo cuando llega un nuevo lead

Para crear una automatización:
1. Ve a **Automation** → **Create an automation**
2. Elige trigger: "Contact added to list"
3. Selecciona la lista de leads
4. Agrega acciones: "Send email", "Wait", etc.

---

## 📱 Configuración de WhatsApp

### Opción A: Uso Básico (Solo Redirección)

Esta opción está **ya lista para usar** sin configuración adicional. Solo necesitas:

1. Actualizar el número de WhatsApp en el archivo `.env`:

```env
VITE_WHATSAPP_PHONE_NUMBER=34612345678  # Tu número real con código de país
```

2. El sistema redirigirá automáticamente a WhatsApp Web/App con mensaje pre-rellenado.

### Opción B: WhatsApp Business API (Avanzado)

Para implementar el agente de WhatsApp con IA, necesitas:

#### Servicios Recomendados:

1. **Twilio** (Más popular)
   - Registro: https://www.twilio.com/
   - Configuración: WhatsApp Business API
   - Costo: ~$1-2 por día + $0.005 por mensaje

2. **MessageBird**
   - Registro: https://messagebird.com/
   - Similar a Twilio

3. **360Dialog**
   - Registro: https://www.360dialog.com/
   - Especializado en WhatsApp Business API

#### Pasos para Configurar con Twilio (Ejemplo):

1. **Crear cuenta en Twilio**
   - Ve a https://www.twilio.com/
   - Crea una cuenta (incluye crédito gratis para pruebas)

2. **Solicitar WhatsApp Business API**
   - En el dashboard, ve a "Messaging" → "Try it out" → "WhatsApp"
   - Solicita acceso a WhatsApp Business API
   - Completa verificación de tu negocio

3. **Configurar Webhook**
   - En Twilio, configura el webhook para recibir mensajes
   - URL del webhook: `https://tudominio.com/api/whatsapp/webhook`
   - Método: POST

4. **Obtener credenciales**
   - Account SID
   - Auth Token
   - WhatsApp Number

5. **Configurar variables de entorno**:

```env
VITE_WHATSAPP_API_URL=https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json
VITE_WHATSAPP_API_TOKEN=your_auth_token
VITE_WHATSAPP_PHONE_NUMBER=whatsapp:+14155238886  # Número de Twilio
```

6. **Implementar Backend para Agente IA**

Necesitarás crear un backend (Node.js/Express, Python/Flask, etc.) que:
- Reciba webhooks de WhatsApp
- Procese mensajes usando el prompt del agente
- Responda a través de la API de Twilio
- Gestione el estado de la conversación

Ejemplo básico con Node.js:

```javascript
// server.js
const express = require('express');
const twilio = require('twilio');

const app = express();
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Webhook para recibir mensajes
app.post('/api/whatsapp/webhook', async (req, res) => {
  const { From, Body } = req.body;

  // Aquí implementarías la lógica del agente con el prompt
  const response = await processMessageWithAgent(Body, From);

  // Enviar respuesta
  await client.messages.create({
    body: response,
    from: 'whatsapp:+14155238886',  // Tu número de Twilio
    to: From
  });

  res.status(200).send('OK');
});

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});
```

---

## 🔐 Variables de Entorno

### Paso 1: Crear archivo .env

Crea un archivo `.env` en la raíz del proyecto (usa `.env.example` como plantilla):

```bash
cp .env.example .env
```

### Paso 2: Completar las variables

Edita el archivo `.env` con tus credenciales reales:

```env
# Brevo Configuration
VITE_BREVO_API_KEY=xkeysib-1234567890abcdef...  # Tu API Key de Brevo
VITE_BREVO_LIST_ID=2  # ID de tu lista de contactos

# WhatsApp Configuration
VITE_WHATSAPP_PHONE_NUMBER=34612345678  # Tu número con código de país (sin +)
VITE_WHATSAPP_API_URL=https://api.twilio.com/...  # Solo si usas API
VITE_WHATSAPP_API_TOKEN=your_token_here  # Solo si usas API

# Optional: Backend API URL
VITE_API_URL=http://localhost:3000
```

### Paso 3: Reiniciar servidor de desarrollo

```bash
npm run dev
```

⚠️ **IMPORTANTE**:
- Nunca subas el archivo `.env` a Git
- Asegúrate de que `.env` esté en `.gitignore`
- Usa variables de entorno en producción (Vercel, Netlify, etc.)

---

## 🤖 Agente de WhatsApp

El archivo `WHATSAPP_AGENT_PROMPT.md` contiene el prompt completo y detallado para el agente de WhatsApp.

### Características del Agente

- ✅ **Objetivo único**: Agendar citas con leads interesados
- ✅ **Persistencia**: 4 intentos estratégicos ante rechazo
- ✅ **Tono natural**: Conversación humana, no robótica
- ✅ **Validación emocional**: Empatía antes de vender
- ✅ **Confirmación rigurosa**: Deletreo de email y teléfono
- ✅ **Proceso estructurado**: 7 pasos desde saludo hasta confirmación

### Cómo Usar el Prompt

#### Opción 1: Plataforma de IA (OpenAI, Claude, etc.)

1. Copia el contenido de `WHATSAPP_AGENT_PROMPT.md`
2. Pégalo en tu plataforma de IA favorita
3. Configura el agente para que use ese prompt como "system message"

#### Opción 2: Implementación Personalizada

Si estás desarrollando tu propio backend:

```javascript
// Ejemplo con OpenAI
const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Cargar prompt
const agentPrompt = fs.readFileSync('./WHATSAPP_AGENT_PROMPT.md', 'utf-8');

async function processMessageWithAgent(userMessage, phoneNumber) {
  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: agentPrompt
      },
      {
        role: "user",
        content: userMessage
      }
    ],
    temperature: 0.7,
  });

  return completion.data.choices[0].message.content;
}
```

#### Opción 3: Plataformas No-Code

Servicios como **Voiceflow**, **Manychat** o **MobileMonkey** permiten importar prompts:

1. Crea un nuevo chatbot
2. Importa el prompt en el nodo principal
3. Configura el flujo de conversación
4. Conecta con WhatsApp Business API

---

## 🧪 Pruebas

### Test 1: Formulario Local

1. Inicia el servidor de desarrollo:
```bash
npm run dev
```

2. Abre http://localhost:5173 (o el puerto que uses)

3. Llena el formulario con datos de prueba

4. Verifica en la consola del navegador:
   - ✅ Lead guardado en localStorage
   - ✅ Petición a Brevo (puede fallar si no está configurado)

### Test 2: Verificar Brevo

1. Ve a tu dashboard de Brevo
2. Navega a **Contacts** → **All Contacts**
3. Busca el email que usaste en la prueba
4. Verifica que los atributos personalizados estén correctos

### Test 3: WhatsApp

1. Después de enviar el formulario, acepta abrir WhatsApp
2. Verifica que el mensaje pre-rellenado contenga:
   - Tu nombre
   - Tu email
   - Tu teléfono
3. Envía el mensaje a tu número de prueba

---

## 🐛 Troubleshooting

### Problema: "Brevo no está configurado correctamente"

**Solución:**
- Verifica que `.env` exista y contenga las variables correctas
- Asegúrate de que las variables empiecen con `VITE_`
- Reinicia el servidor de desarrollo

### Problema: Error 401 en Brevo API

**Solución:**
- Verifica que tu API Key sea correcta
- Asegúrate de que la API Key tenga permisos para crear contactos
- Regenera la API Key si es necesaria

### Problema: Contacto duplicado en Brevo

**Solución:**
- Esto es normal, el servicio está configurado con `updateEnabled: true`
- El contacto se actualiza automáticamente si ya existe

### Problema: WhatsApp no se abre

**Solución:**
- Verifica que el número en `.env` esté en formato correcto (sin + ni espacios)
- Ejemplo correcto: `34612345678`
- Ejemplo incorrecto: `+34 612 34 56 78`

### Problema: Variables de entorno no se cargan

**Solución:**
- En Vite, las variables DEBEN empezar con `VITE_`
- Reinicia el servidor después de cambiar `.env`
- Verifica con: `console.log(import.meta.env.VITE_BREVO_API_KEY)`

---

## 📊 Pipeline de Leads en Brevo

El sistema usa este pipeline de estados:

1. **nuevo_lead**: Lead acaba de registrarse
2. **contactado**: Primer contacto realizado
3. **interesado**: Lead muestra interés activo
4. **reserva_pendiente**: Cita agendada, pendiente de confirmar
5. **alumno_confirmado**: Lead confirmado como alumno

Puedes actualizar el status manualmente en Brevo o programáticamente:

```typescript
import { brevoService } from '@/services/brevo.service';

// Actualizar status de un lead
await brevoService.updateLeadStatus(
  'lead@example.com',
  'interesado'
);
```

---

## 🚀 Despliegue a Producción

### Variables de Entorno en Producción

#### Vercel
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega cada variable con su valor

#### Netlify
1. Site settings → Environment variables
2. Agrega cada variable

#### Otros proveedores
- Consulta la documentación específica de tu proveedor

### Checklist Pre-Producción

- [ ] Todas las variables de entorno configuradas
- [ ] API Key de Brevo con permisos correctos
- [ ] Número de WhatsApp real configurado
- [ ] Emails de confirmación de Brevo configurados
- [ ] Prompt del agente de WhatsApp revisado y adaptado
- [ ] Tests realizados con datos reales
- [ ] Backup de localStorage funcionando
- [ ] Política de privacidad actualizada

---

## 📞 Soporte

Si tienes problemas con la configuración:

1. Revisa los logs de la consola del navegador
2. Verifica la documentación de [Brevo API](https://developers.brevo.com/)
3. Consulta la documentación de [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp)

---

## 📝 Notas Adicionales

### Límites y Costos

**Brevo (Plan Gratuito):**
- 300 emails/día
- Contactos ilimitados
- API incluida

**WhatsApp Business API:**
- Twilio: ~$1-2/día + $0.005/mensaje
- Meta (directo): Requiere verificación de negocio

### Recomendaciones

1. **Backup siempre activo**: El sistema guarda en localStorage como fallback
2. **Monitorea tus logs**: Brevo y WhatsApp registran todos los eventos
3. **Automatiza seguimientos**: Usa las automatizaciones de Brevo
4. **Analiza métricas**: Brevo ofrece analytics detallados

---

**¡Sistema listo para capturar y convertir leads! 🎉**
