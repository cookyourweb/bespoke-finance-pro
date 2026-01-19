-- ============================================================================
-- BESPOKE FINANCE PRO - CRM B2C Schema
-- Migración inicial para sistema completo de gestión de leads y estudiantes
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLA: courses (Cursos/Programas)
-- Almacena todos los cursos y programas de la academia
-- ============================================================================
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL, -- URL-friendly identifier
  name TEXT NOT NULL,
  description TEXT,
  category TEXT, -- 'modelizacion-financiera', 'valuation', 'excel', etc.
  format TEXT, -- 'blended', 'online', 'presencial'
  price_eur DECIMAL(10,2),
  duration_weeks INTEGER,
  max_students INTEGER,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  landing_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- TABLA: leads (Leads/Prospectos)
-- Source of truth para todos los leads del CRM
-- ============================================================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Información personal
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,

  -- Información profesional
  perfil_profesional TEXT, -- 'graduado', 'profesional_finanzas', 'consultor', etc.
  empresa TEXT,
  cargo TEXT,
  experiencia_anos INTEGER,

  -- Información académica
  formacion_previa TEXT, -- 'ADE', 'Ingeniería', 'Economía', etc.

  -- Lead scoring y cualificación
  lead_score INTEGER DEFAULT 0, -- 0-100
  temperatura TEXT DEFAULT 'frio', -- 'frio', 'tibio', 'caliente'
  interes_nivel TEXT, -- 'bajo', 'medio', 'alto', 'muy_alto'

  -- Pipeline y status
  status TEXT DEFAULT 'nuevo_lead',
  -- Pipeline: nuevo_lead → contactado → calificado → interesado →
  --           negociacion → reserva_pendiente → ganado → perdido
  status_reason TEXT, -- Razón del status (ej: "No responde", "Precio alto")

  -- Tracking de fuente
  source TEXT NOT NULL, -- 'landing', 'whatsapp', 'facebook', 'google_ads', 'referral'
  landing_page TEXT, -- URL específica de donde vino
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,

  -- Curso de interés
  course_id UUID REFERENCES courses(id),
  modalidad_preferida TEXT, -- 'online', 'presencial', 'indiferente'

  -- Integraciones externas
  brevo_contact_id TEXT,
  brevo_synced_at TIMESTAMP WITH TIME ZONE,

  -- Metadata técnica
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,

  -- Fechas importantes
  first_contact_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_contact_at TIMESTAMP WITH TIME ZONE,
  qualified_at TIMESTAMP WITH TIME ZONE,
  converted_at TIMESTAMP WITH TIME ZONE,
  lost_at TIMESTAMP WITH TIME ZONE,

  -- Ownership
  assigned_to TEXT, -- Email del comercial asignado

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- ============================================================================
-- TABLA: conversations (Conversaciones)
-- Agrupa todos los mensajes de una conversación (WhatsApp, email, etc.)
-- ============================================================================
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,

  -- Información del canal
  channel TEXT NOT NULL, -- 'whatsapp', 'email', 'phone', 'chat_web'
  channel_identifier TEXT, -- Número de WhatsApp, email, etc.

  -- Status de la conversación
  status TEXT DEFAULT 'active', -- 'active', 'closed', 'archived'

  -- Metadata
  subject TEXT, -- Para emails o resumen de conversación
  started_by TEXT, -- 'lead' o 'agent'
  agent_name TEXT, -- Nombre del agente que atendió

  -- AI Agent
  ai_handled BOOLEAN DEFAULT false,
  ai_model TEXT, -- 'gpt-4', 'claude-3', etc.
  ai_prompt_version TEXT,

  -- Timing
  first_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_message_at TIMESTAMP WITH TIME ZONE,
  closed_at TIMESTAMP WITH TIME ZONE,

  -- Stats
  total_messages INTEGER DEFAULT 0,
  messages_from_lead INTEGER DEFAULT 0,
  messages_from_agent INTEGER DEFAULT 0,
  avg_response_time_seconds INTEGER,

  -- Outcome
  outcome TEXT, -- 'cita_agendada', 'informacion_enviada', 'no_interesado', 'sin_respuesta'
  outcome_notes TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- TABLA: messages (Mensajes)
-- Todos los mensajes de todas las conversaciones
-- ============================================================================
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,

  -- Contenido
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text', -- 'text', 'image', 'audio', 'video', 'document'

  -- Dirección
  direction TEXT NOT NULL, -- 'incoming' (del lead) o 'outgoing' (del agente/AI)
  sender_name TEXT,

  -- Metadata del canal
  external_id TEXT, -- ID del mensaje en el sistema externo (Twilio, etc.)
  channel_metadata JSONB, -- Datos adicionales del canal

  -- AI processing
  ai_generated BOOLEAN DEFAULT false,
  ai_confidence DECIMAL(3,2), -- 0.00 - 1.00
  ai_intent TEXT, -- Intent detectado por IA
  ai_sentiment TEXT, -- 'positive', 'neutral', 'negative'

  -- Status
  delivered BOOLEAN DEFAULT false,
  read BOOLEAN DEFAULT false,
  delivered_at TIMESTAMP WITH TIME ZONE,
  read_at TIMESTAMP WITH TIME ZONE,

  -- Timestamps
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- TABLA: appointments (Citas/Reuniones)
-- Citas agendadas con los leads
-- ============================================================================
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES conversations(id), -- De dónde se agendó

  -- Información de la cita
  title TEXT NOT NULL,
  description TEXT,
  appointment_type TEXT, -- 'sesion_informativa', 'entrevista', 'seguimiento'

  -- Timing
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 45,
  timezone TEXT DEFAULT 'Europe/Madrid',

  -- Status
  status TEXT DEFAULT 'scheduled', -- 'scheduled', 'confirmed', 'completed', 'cancelled', 'no_show'
  cancellation_reason TEXT,

  -- Participantes
  agent_email TEXT,
  agent_name TEXT,
  meeting_url TEXT, -- Zoom, Google Meet, etc.
  meeting_id TEXT,

  -- Confirmación
  confirmation_sent_at TIMESTAMP WITH TIME ZONE,
  confirmation_email_id TEXT,
  reminder_sent_at TIMESTAMP WITH TIME ZONE,

  -- Outcome
  attended BOOLEAN,
  outcome_notes TEXT,
  follow_up_required BOOLEAN DEFAULT false,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- TABLA: students (Estudiantes)
-- Leads que se convirtieron en estudiantes
-- ============================================================================
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,

  -- Información personal (duplicada para histórico)
  nombre TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telefono TEXT,
  dni TEXT,
  fecha_nacimiento DATE,

  -- Información académica extendida
  formacion_previa TEXT,
  universidad TEXT,
  ano_graduacion INTEGER,

  -- Información laboral
  empresa_actual TEXT,
  cargo_actual TEXT,
  sector TEXT,
  anos_experiencia INTEGER,

  -- LinkedIn
  linkedin_url TEXT,

  -- Status
  status TEXT DEFAULT 'activo', -- 'activo', 'pausado', 'graduado', 'baja'

  -- Información de pago
  forma_pago TEXT, -- 'contado', 'financiado', 'empresa'
  descuento_aplicado DECIMAL(5,2),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- TABLA: enrollments (Matrículas)
-- Relación entre estudiantes y cursos
-- ============================================================================
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE RESTRICT,

  -- Información de la matrícula
  enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  start_date DATE,
  end_date DATE,
  expected_completion_date DATE,
  actual_completion_date DATE,

  -- Status
  status TEXT DEFAULT 'enrolled', -- 'enrolled', 'in_progress', 'completed', 'dropped', 'suspended'

  -- Pricing
  price_paid DECIMAL(10,2),
  currency TEXT DEFAULT 'EUR',
  payment_status TEXT, -- 'pending', 'partial', 'paid', 'refunded'

  -- Modalidad
  modalidad TEXT, -- 'online', 'presencial', 'blended'

  -- Progress
  completion_percentage INTEGER DEFAULT 0,
  last_activity_at TIMESTAMP WITH TIME ZONE,

  -- Certificación
  certificate_issued BOOLEAN DEFAULT false,
  certificate_issued_at TIMESTAMP WITH TIME ZONE,
  certificate_url TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- TABLA: activities (Actividades)
-- Timeline de todas las interacciones con un lead
-- ============================================================================
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,

  -- Tipo de actividad
  activity_type TEXT NOT NULL,
  -- 'email_sent', 'email_opened', 'email_clicked',
  -- 'whatsapp_message', 'phone_call', 'meeting',
  -- 'form_submitted', 'page_visited', 'note_added'

  -- Detalles
  title TEXT,
  description TEXT,
  metadata JSONB, -- Datos adicionales específicos del tipo de actividad

  -- Usuario/Sistema que generó la actividad
  created_by TEXT, -- Email del usuario o 'system' o 'ai_agent'

  -- Referencia a otros objetos
  conversation_id UUID REFERENCES conversations(id),
  appointment_id UUID REFERENCES appointments(id),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- TABLA: lead_notes (Notas de Leads)
-- Notas y comentarios sobre los leads
-- ============================================================================
CREATE TABLE lead_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,

  content TEXT NOT NULL,
  note_type TEXT, -- 'general', 'follow_up', 'importante', 'objecion'

  created_by TEXT NOT NULL, -- Email del usuario

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- TABLA: analytics_events (Eventos de Analytics)
-- Tracking de eventos para análisis y optimización
-- ============================================================================
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Identificadores
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  session_id TEXT,
  anonymous_id TEXT,

  -- Evento
  event_name TEXT NOT NULL,
  -- 'page_view', 'cta_clicked', 'form_started', 'form_completed',
  -- 'video_watched', 'download', 'whatsapp_opened', etc.

  event_category TEXT, -- 'engagement', 'conversion', 'navigation'

  -- Propiedades del evento
  properties JSONB,

  -- Contexto
  page_url TEXT,
  page_title TEXT,
  referrer TEXT,

  -- Información técnica
  ip_address INET,
  user_agent TEXT,
  device_type TEXT, -- 'mobile', 'tablet', 'desktop'
  browser TEXT,
  os TEXT,

  -- UTMs
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- ÍNDICES para optimización de queries
-- ============================================================================

-- Leads
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_telefono ON leads(telefono);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_course_id ON leads(course_id);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_temperatura ON leads(temperatura);
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to);

-- Conversations
CREATE INDEX idx_conversations_lead_id ON conversations(lead_id);
CREATE INDEX idx_conversations_channel ON conversations(channel);
CREATE INDEX idx_conversations_status ON conversations(status);
CREATE INDEX idx_conversations_created_at ON conversations(created_at DESC);

-- Messages
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_sent_at ON messages(sent_at DESC);
CREATE INDEX idx_messages_direction ON messages(direction);

-- Appointments
CREATE INDEX idx_appointments_lead_id ON appointments(lead_id);
CREATE INDEX idx_appointments_scheduled_at ON appointments(scheduled_at);
CREATE INDEX idx_appointments_status ON appointments(status);

-- Students
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_students_lead_id ON students(lead_id);

-- Enrollments
CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);

-- Activities
CREATE INDEX idx_activities_lead_id ON activities(lead_id);
CREATE INDEX idx_activities_created_at ON activities(created_at DESC);
CREATE INDEX idx_activities_activity_type ON activities(activity_type);

-- Analytics Events
CREATE INDEX idx_analytics_events_lead_id ON analytics_events(lead_id);
CREATE INDEX idx_analytics_events_event_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at DESC);

-- ============================================================================
-- FUNCIONES para updated_at automático
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar triggers a todas las tablas con updated_at
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON enrollments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lead_notes_updated_at BEFORE UPDATE ON lead_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) - Deshabilitado por ahora
-- Se puede habilitar más adelante cuando tengamos roles de usuarios
-- ============================================================================

-- ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Users can view their assigned leads" ON leads
--   FOR SELECT USING (assigned_to = auth.jwt() ->> 'email');

-- ============================================================================
-- DATOS INICIALES: Curso de Modelización Financiera
-- ============================================================================

INSERT INTO courses (slug, name, description, category, format, price_eur, duration_weeks, is_active, landing_url)
VALUES (
  'modelizacion-financiera-profesional',
  'Modelización Financiera Profesional',
  'Programa intensivo de modelización financiera en Excel para analistas financieros',
  'modelizacion-financiera',
  'blended',
  2990.00,
  12,
  true,
  'https://bespokefinance.com'
);

-- ============================================================================
-- FIN DE MIGRACIÓN
-- ============================================================================
