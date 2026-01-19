# 🚀 Guía Completa de Setup - Supabase CRM B2C

Esta guía te llevará paso a paso para configurar Supabase como tu CRM B2C principal escalable.

---

## 📋 Tabla de Contenidos

1. [Visión General](#visión-general)
2. [Crear Proyecto en Supabase](#crear-proyecto-en-supabase)
3. [Configurar Base de Datos](#configurar-base-de-datos)
4. [Variables de Entorno](#variables-de-entorno)
5. [Probar la Integración](#probar-la-integración)
6. [Backend de WhatsApp con Edge Functions](#backend-de-whatsapp)
7. [Dashboard y Queries Útiles](#dashboard-y-queries)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Visión General

### Arquitectura Completa

```
┌─────────────────────────────────────────────────────────┐
│             SUPABASE (Source of Truth)                   │
│  PostgreSQL + Edge Functions + Real-time + Storage      │
│                                                           │
│  Tablas:                                                 │
│  ├─ courses (cursos/programas)                          │
│  ├─ leads (prospectos)                                  │
│  ├─ conversations (WhatsApp, email, etc.)               │
│  ├─ messages (mensajes de conversaciones)               │
│  ├─ appointments (citas agendadas)                      │
│  ├─ students (estudiantes confirmados)                  │
│  ├─ enrollments (matrículas)                            │
│  ├─ activities (timeline de interacciones)              │
│  ├─ lead_notes (notas internas)                         │
│  └─ analytics_events (tracking de eventos)              │
└─────────────────────────────────────────────────────────┘
              ↓ Sincroniza ↓
┌─────────────────────────────────────────────────────────┐
│                    BREVO (Secundario)                    │
│              Email Marketing & Automatizaciones          │
└─────────────────────────────────────────────────────────┘
```

### ¿Por qué Supabase?

- ✅ **PostgreSQL real**: Base de datos relacional profesional
- ✅ **Serverless**: No necesitas servidor propio
- ✅ **Edge Functions**: Backend sin código servidor
- ✅ **Real-time**: Updates en vivo (opcional)
- ✅ **Storage**: Para archivos, certificados, etc.
- ✅ **Auth integrado**: Login de usuarios cuando lo necesites
- ✅ **API REST automática**: Queries desde cualquier lugar
- ✅ **Plan gratuito generoso**: Hasta 500MB DB + 2GB bandwidth/mes

---

## 🆕 Crear Proyecto en Supabase

### Paso 1: Crear Cuenta

1. Ve a [https://supabase.com](https://supabase.com)
2. Click en "Start your project"
3. Registrate con GitHub, Google o email

### Paso 2: Crear Nuevo Proyecto

1. Click en "New Project"
2. Completa el formulario:
   - **Organization**: Crea una nueva o usa existente (ej: "Bespoke Finance")
   - **Project Name**: `bespoke-finance-crm` (o el nombre que prefieras)
   - **Database Password**: Genera una contraseña segura y **guárdala**
   - **Region**: `Europe West (London)` o la más cercana a España
   - **Pricing Plan**: Free (suficiente para empezar)

3. Click en "Create new project"

⏱️ **Espera 2-3 minutos** mientras Supabase configura tu proyecto.

### Paso 3: Obtener Credenciales

Una vez creado el proyecto:

1. Ve a **Settings** (⚙️ en la barra lateral)
2. Click en **API**
3. Anota estas dos credenciales:

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🗄️ Configurar Base de Datos

### Opción A: Usar SQL Editor (Recomendado)

1. En Supabase, ve a **SQL Editor** (icono </> en sidebar)
2. Click en "+ New query"
3. Copia y pega el contenido COMPLETO del archivo:
   ```
   supabase/migrations/001_initial_schema.sql
   ```
4. Click en "Run" (▶️)

⏱️ Debería tardar 5-10 segundos. Si todo va bien, verás: "Success. No rows returned"

5. Ve a **Table Editor** y verifica que se crearon las tablas:
   - courses
   - leads
   - conversations
   - messages
   - appointments
   - students
   - enrollments
   - activities
   - lead_notes
   - analytics_events

### Opción B: Usar Supabase CLI (Avanzado)

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Link al proyecto
supabase link --project-ref tu-project-ref

# Aplicar migraciones
supabase db push
```

---

## 🔐 Variables de Entorno

### Paso 1: Actualizar .env

Crea o edita el archivo `.env` en la raíz del proyecto:

```bash
# Copia el template
cp .env.example .env
```

### Paso 2: Agregar Credenciales de Supabase

Edita `.env` y completa con tus credenciales:

```env
# =============================================================================
# SUPABASE Configuration (Primary Database)
# =============================================================================
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# =============================================================================
# BREVO Configuration (Secondary - Email Marketing)
# =============================================================================
VITE_BREVO_API_KEY=xkeysib-tu-api-key
VITE_BREVO_LIST_ID=2

# =============================================================================
# WHATSAPP Configuration
# =============================================================================
VITE_WHATSAPP_PHONE_NUMBER=34612345678
```

### Paso 3: Reiniciar Servidor

```bash
npm run dev
```

---

## 🧪 Probar la Integración

### Test 1: Verificar Conexión

Abre la consola del navegador (F12) y ejecuta:

```javascript
// Debería mostrar tu URL de Supabase
console.log(import.meta.env.VITE_SUPABASE_URL);
```

### Test 2: Enviar Lead de Prueba

1. Abre http://localhost:5173
2. Scroll a la sección del formulario
3. Llena con datos de prueba:
   - Nombre: "Test Lead"
   - Email: "test@example.com"
   - Teléfono: "612345678"
   - Perfil: "Graduado universitario"
   - Modalidad: "Online"

4. Click en "Solicitar plaza"

5. Verifica en la consola:
   ```
   ✅ Lead guardado en Supabase (DB principal)
   ✅ Lead sincronizado con Brevo (email marketing)
   ```

### Test 3: Verificar en Supabase Dashboard

1. Ve a Supabase → **Table Editor**
2. Click en tabla **leads**
3. Deberías ver tu lead de prueba con todos los datos:
   - nombre, email, teléfono
   - perfil_profesional: "graduado"
   - modalidad_preferida: "online"
   - status: "nuevo_lead"
   - source: "landing"
   - lead_score (calculado automáticamente)
   - utm parameters (si los usaste)
   - ip_address, user_agent

4. Click en tabla **analytics_events**
5. Deberías ver eventos:
   - `page_view`
   - `form_submitted`
   - `lead_created`

---

## 🤖 Backend de WhatsApp con Edge Functions

Si quieres automatizar WhatsApp con IA, sigue estos pasos:

### Requisitos Previos

1. **Twilio Account** (o 360Dialog)
   - Regístrate en [twilio.com](https://www.twilio.com/)
   - Solicita WhatsApp Business API
   - Obtén:
     - Account SID
     - Auth Token
     - WhatsApp Number

2. **OpenAI API Key**
   - Ve a [platform.openai.com](https://platform.openai.com/)
   - Crea API Key
   - Ten saldo disponible ($5-20 recomendado)

### Paso 1: Configurar Variables en Supabase

1. En Supabase, ve a **Settings** → **Edge Functions**
2. Agrega estos secrets:

```
OPENAI_API_KEY=sk-...
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
BREVO_API_KEY=xkeysib-... (opcional)
```

### Paso 2: Instalar Supabase CLI

```bash
npm install -g supabase
```

### Paso 3: Login y Link

```bash
# Login
supabase login

# Link a tu proyecto
supabase link --project-ref tu-project-ref
```

### Paso 4: Deploy Edge Function

```bash
# Deploy función de WhatsApp
supabase functions deploy whatsapp-webhook

# Obtener URL del webhook
# Te dará algo como:
# https://xxxxx.supabase.co/functions/v1/whatsapp-webhook
```

### Paso 5: Configurar Webhook en Twilio

1. Ve a Twilio Console → Messaging → Settings → WhatsApp Sandbox
2. En "WHEN A MESSAGE COMES IN":
   - URL: `https://xxxxx.supabase.co/functions/v1/whatsapp-webhook`
   - Method: POST

3. Save

### Paso 6: Probar WhatsApp

1. Únete al Sandbox de Twilio (envía el código que te dan)
2. Envía un mensaje: "Hola"
3. El agente IA debería responder automáticamente
4. Verifica en Supabase:
   - Tabla `conversations`: nueva conversación
   - Tabla `messages`: mensajes de ida y vuelta
   - Tabla `activities`: actividad registrada

---

## 📊 Dashboard y Queries Útiles

### Ver Todos los Leads con Info Completa

```sql
SELECT
  l.nombre,
  l.email,
  l.telefono,
  l.status,
  l.temperatura,
  l.lead_score,
  l.source,
  c.name as curso_interes,
  l.created_at,
  l.last_contact_at
FROM leads l
LEFT JOIN courses c ON l.course_id = c.id
ORDER BY l.created_at DESC;
```

### Leads Calientes (Hot Leads)

```sql
SELECT
  nombre,
  email,
  telefono,
  lead_score,
  temperatura,
  status
FROM leads
WHERE temperatura = 'caliente'
  AND status IN ('nuevo_lead', 'contactado', 'interesado')
ORDER BY lead_score DESC;
```

### Conversiones por Fuente

```sql
SELECT
  source,
  COUNT(*) as total_leads,
  COUNT(CASE WHEN status = 'ganado' THEN 1 END) as convertidos,
  ROUND(COUNT(CASE WHEN status = 'ganado' THEN 1 END)::numeric / COUNT(*)::numeric * 100, 2) as tasa_conversion
FROM leads
GROUP BY source
ORDER BY total_leads DESC;
```

### Timeline Completo de un Lead

```sql
SELECT
  activity_type,
  title,
  description,
  created_at
FROM activities
WHERE lead_id = 'UUID-DEL-LEAD-AQUI'
ORDER BY created_at DESC;
```

### Performance de Campañas (UTM)

```sql
SELECT
  utm_source,
  utm_campaign,
  COUNT(*) as leads,
  AVG(lead_score) as avg_score,
  COUNT(CASE WHEN status = 'ganado' THEN 1 END) as conversiones
FROM leads
WHERE utm_campaign IS NOT NULL
GROUP BY utm_source, utm_campaign
ORDER BY leads DESC;
```

### Estadísticas de Conversaciones de WhatsApp

```sql
SELECT
  DATE(created_at) as fecha,
  COUNT(*) as total_conversaciones,
  AVG(total_messages) as mensajes_promedio,
  COUNT(CASE WHEN outcome = 'cita_agendada' THEN 1 END) as citas_agendadas
FROM conversations
WHERE channel = 'whatsapp'
GROUP BY DATE(created_at)
ORDER BY fecha DESC;
```

---

## 🐛 Troubleshooting

### Error: "Supabase no configurado"

**Problema:** Las variables de entorno no se están cargando.

**Solución:**
1. Verifica que el archivo `.env` existe en la raíz
2. Las variables DEBEN empezar con `VITE_`
3. Reinicia el servidor: `npm run dev`
4. Verifica en consola: `console.log(import.meta.env.VITE_SUPABASE_URL)`

### Error: "Failed to fetch" al crear lead

**Problema:** CORS o URL incorrecta.

**Solución:**
1. Verifica la URL de Supabase en `.env`
2. Debe ser: `https://xxxxx.supabase.co` (sin barra final)
3. Verifica que la Anon Key sea la correcta

### Error: "relation 'leads' does not exist"

**Problema:** Las tablas no se crearon.

**Solución:**
1. Ve a Supabase → SQL Editor
2. Ejecuta el script de migración completo
3. Verifica en Table Editor que las tablas existan

### Los eventos de analytics no se guardan

**Problema:** Configuración de RLS o permisos.

**Solución:**
Ejecuta en SQL Editor:

```sql
-- Deshabilitar RLS temporalmente para testing
ALTER TABLE analytics_events DISABLE ROW LEVEL SECURITY;
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
ALTER TABLE activities DISABLE ROW LEVEL SECURITY;
```

**Nota:** En producción, configura RLS correctamente según tus necesidades.

### Edge Function no responde

**Problema:** Variables de entorno no configuradas o función no deployada.

**Solución:**
1. Verifica secrets: `supabase secrets list`
2. Re-deploy: `supabase functions deploy whatsapp-webhook`
3. Revisa logs: Ve a Supabase → Functions → whatsapp-webhook → Logs

---

## 📈 Próximos Pasos

Una vez que tengas todo funcionando:

### Fase 1: Validación (Primeras 2 semanas)
- [ ] Capturar primeros 20-50 leads
- [ ] Probar flujo completo manual
- [ ] Ajustar scoring de leads
- [ ] Refinar prompt del agente de WhatsApp

### Fase 2: Automatización (Mes 1)
- [ ] Deploy de Edge Function de WhatsApp
- [ ] Automatizaciones de email en Brevo
- [ ] Dashboard de métricas
- [ ] Alertas para leads calientes

### Fase 3: Optimización (Mes 2-3)
- [ ] A/B testing de landing pages
- [ ] Segmentación avanzada
- [ ] Campañas de retargeting
- [ ] Integración con calendar (Calendly/Cal.com)

### Fase 4: Escalabilidad (Mes 3+)
- [ ] Múltiples cursos/productos
- [ ] Portal de estudiantes
- [ ] Certificaciones digitales
- [ ] Análisis predictivo con IA

---

## 🎓 Recursos Adicionales

### Documentación Oficial
- [Supabase Docs](https://supabase.com/docs)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)

### Tutoriales
- [Supabase Quick Start](https://supabase.com/docs/guides/getting-started)
- [Edge Functions con Deno](https://deno.land/manual)
- [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp)

### Comunidad
- [Supabase Discord](https://discord.supabase.com/)
- [Supabase GitHub](https://github.com/supabase/supabase)

---

## 💰 Pricing y Límites

### Plan Gratuito (Free)
- ✅ 500 MB de base de datos
- ✅ 2 GB de ancho de banda/mes
- ✅ 50,000 usuarios activos mensuales
- ✅ 2 GB de storage
- ✅ Edge Functions ilimitadas
- ✅ SSL incluido

**Suficiente para:**
- 1,000-2,000 leads
- 10,000-20,000 mensajes de WhatsApp/mes
- Landing page con 50,000 visitas/mes

### Plan Pro ($25/mes)
- ✅ 8 GB de base de datos
- ✅ 250 GB de ancho de banda
- ✅ 100,000 usuarios activos mensuales
- ✅ 100 GB de storage
- ✅ Daily backups
- ✅ Soporte prioritario

**Recomendado cuando:**
- Más de 2,000 leads
- Múltiples cursos activos
- Alto volumen de WhatsApp
- Necesitas backups automáticos

---

**¡Tu CRM B2C escalable está listo! 🚀**

Si tienes problemas, revisa el [Troubleshooting](#troubleshooting) o consulta la documentación oficial de Supabase.
