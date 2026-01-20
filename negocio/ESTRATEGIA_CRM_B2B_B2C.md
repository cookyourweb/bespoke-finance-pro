# 🏢 ESTRATEGIA CRM: B2B + B2C UNIFICADO
## BESPOKE SCHOOL OF FINANCE

---

## 🎯 SITUACIÓN ACTUAL

**Bespoke tiene DOS modelos de negocio:**

### B2B (Modelo actual establecido)
- Venta de formación a empresas
- La empresa paga, forma a sus empleados
- Acuerdos de confidencialidad
- **Restricción:** No se puede contactar a los alumnos individualmente

### B2C (Modelo nuevo a activar)
- Venta directa a alumnos particulares
- El alumno paga de su bolsillo
- Sin restricciones de contacto
- **Objetivo:** Captar y gestionar leads individuales

---

## ❓ LA PREGUNTA CLAVE

> "¿Podemos usar un MISMO CRM para B2B y B2C?"
>
> **RESPUESTA CORTA:** Sí, y es altamente recomendable.

**Por qué:**
- ✅ Un solo sistema para gestionar TODO el negocio
- ✅ Datos centralizados
- ✅ Menos herramientas = menos complejidad
- ✅ Visión unificada del negocio
- ✅ Aprovechamiento estratégico entre ambos modelos

---

## 🏗️ ARQUITECTURA DEL CRM UNIFICADO

### ESTRUCTURA RECOMENDADA

El CRM debe tener **dos secciones paralelas pero conectadas:**

```
CRM BESPOKE
│
├── 📊 MÓDULO B2C
│   ├── Leads individuales
│   ├── Alumnos particulares
│   ├── Conversaciones WhatsApp/Email
│   ├── Pipeline de venta directa
│   └── Cursos abiertos
│
└── 🏢 MÓDULO B2B
    ├── Empresas (entidades)
    ├── Contactos empresariales
    ├── Acuerdos comerciales
    ├── Pipeline empresarial
    └── Cursos in-company
```

---

## 🔗 QUÉ PUEDEN COMPARTIR B2B Y B2C

### ✅ ELEMENTOS COMPARTIDOS

#### 1. **Cursos (Catálogo)**
- El mismo curso puede venderse B2B o B2C
- Ejemplo: "Finanzas Corporativas Avanzadas"
  - Versión B2C: Curso abierto individual (2,990€)
  - Versión B2B: Curso in-company (negociable)

**En el CRM:**
```
Tabla: courses
- id
- nombre
- descripcion
- precio_b2c
- precio_b2b_base
- modalidad (presencial/online/híbrido)
- tipo_venta: ["b2c", "b2b", "ambos"]
```

#### 2. **Profesores/Formadores**
- Los mismos profesores imparten B2B y B2C
- Gestión centralizada de disponibilidad

#### 3. **Métricas generales**
- Ingresos totales
- Alumnos formados totales
- Cursos impartidos

---

### ❌ ELEMENTOS SEPARADOS (POR PRIVACIDAD)

#### 1. **Alumnos B2B (NO contactables)**
- **Problema:** Acuerdos con empresas prohíben contacto directo
- **Solución:** Registrar alumnos B2B SIN datos de contacto personal
- **Solo guardar:**
  - Nombre (anonimizado si hace falta)
  - Empresa de origen
  - Curso realizado
  - Fecha
  - Certificado emitido

**En el CRM:**
```
Tabla: students_b2b
- id
- nombre_anonimizado (ej: "Alumno_123")
- empresa_id (referencia a tabla empresas)
- curso_id
- fecha_inicio
- fecha_fin
- certificado_emitido
- notas_internas
- SIN: email, teléfono, LinkedIn (para proteger privacidad)
```

#### 2. **Leads/Alumnos B2C (100% contactables)**
- Datos completos de contacto
- WhatsApp, email, LinkedIn, teléfono
- Seguimiento activo

**En el CRM:**
```
Tabla: leads_b2c
- id
- nombre_completo
- email
- telefono
- whatsapp
- linkedin_url
- empresa_actual (donde trabaja, pero es lead individual)
- puesto
- status
- temperatura
- ...
```

---

## 🏢 CÓMO ESTRUCTURAR EL MÓDULO B2B EN EL CRM

### ENTIDADES CLAVE

#### 1. **EMPRESAS (Companies)**
La empresa es el "lead" en B2B.

```
Tabla: companies
- id
- nombre_empresa
- sector
- tamaño (empleados)
- ubicacion
- web
- status: ["prospecto", "cliente_activo", "cliente_inactivo"]
- origen: ["referencia", "linkedin", "networking", "inbound"]
- valor_total_facturado
- cursos_contratados
- fecha_primer_contacto
- fecha_ultima_compra
- notas
```

**Ejemplo de empresa:**
```
Nombre: Deloitte España
Sector: Consultoría
Tamaño: 1000+ empleados
Status: cliente_activo
Cursos contratados: 3
Valor facturado: 45,000€
```

---

#### 2. **CONTACTOS EMPRESARIALES (Company Contacts)**
Personas dentro de las empresas B2B con las que SÍ puedes hablar.

```
Tabla: company_contacts
- id
- empresa_id (relación con companies)
- nombre
- puesto
- email_corporativo
- telefono
- linkedin
- rol: ["decision_maker", "influencer", "usuario_final", "RR.HH"]
- notas
```

**Diferencia clave:**
- ✅ **Contacto empresarial:** Persona que negocia/contrata (SÍ contactable)
- ❌ **Alumno B2B:** Persona que recibe formación (NO contactable)

**Ejemplo:**
```
Empresa: Deloitte
Contacto: María García
Puesto: HR Manager
Email: maria.garcia@deloitte.es
Rol: decision_maker
Notas: "Negocia cursos de finanzas para juniors"
```

Este contacto SÍ es contactable porque es el cliente, no el alumno.

---

#### 3. **ACUERDOS/CONTRATOS (Agreements)**
Los acuerdos comerciales con empresas.

```
Tabla: agreements
- id
- empresa_id
- contacto_responsable_id
- curso_id
- numero_alumnos
- precio_total
- precio_por_alumno
- fecha_inicio
- fecha_fin
- status: ["propuesta", "firmado", "en_ejecucion", "completado"]
- terminos_especiales
- restricciones: ["no_contactar_alumnos", "confidencialidad", etc.]
```

**Ejemplo:**
```
Empresa: Deloitte
Curso: Finanzas Corporativas
Alumnos: 15
Precio total: 35,000€
Precio/alumno: 2,333€
Restricción: "No contactar alumnos directamente"
```

---

## 🔄 FLUJO DE TRABAJO B2B EN EL CRM

### PASO 1: PROSPECCIÓN
Identificar empresas objetivo.

**Acciones en CRM:**
1. Crear empresa como "prospecto"
2. Identificar contacto clave (HR, Training Manager, etc.)
3. Registrar primer contacto
4. Pipeline: "Prospección"

---

### PASO 2: CUALIFICACIÓN
Evaluar si la empresa es un buen cliente.

**Criterios:**
- Tamaño de empresa (¿cuántos empleados potenciales?)
- Presupuesto de formación
- Necesidad detectada
- Ciclo de decisión

**Acciones en CRM:**
- Actualizar status: "Prospecto calificado"
- Pipeline: "Cualificación"

---

### PASO 3: PROPUESTA
Enviar propuesta comercial.

**Acciones en CRM:**
- Crear acuerdo en status "propuesta"
- Adjuntar documento de propuesta
- Registrar fecha de envío
- Pipeline: "Propuesta enviada"

---

### PASO 4: NEGOCIACIÓN
Ajustes de precio, fechas, contenido.

**Acciones en CRM:**
- Actualizar acuerdo con cambios
- Registrar conversaciones con contacto
- Pipeline: "Negociación"

---

### PASO 5: CIERRE
Firma del contrato.

**Acciones en CRM:**
- Acuerdo status: "firmado"
- Empresa status: "cliente_activo"
- Pipeline: "Ganado"
- Crear registro de facturación

---

### PASO 6: EJECUCIÓN
Impartir el curso a los empleados de la empresa.

**Acciones en CRM:**
- Acuerdo status: "en_ejecucion"
- Crear registros en `students_b2b` (anónimos)
- Registrar asistencia, certificados
- **NO guardar emails/teléfonos de alumnos**

---

### PASO 7: POST-VENTA
Seguimiento para renovación.

**Acciones en CRM:**
- Acuerdo status: "completado"
- Registrar feedback de empresa (contacto clave)
- Programar follow-up para nuevo curso
- Pipeline: "Upsell / Cross-sell"

---

## 🎯 ESTRATEGIAS B2B SIN VIOLAR ACUERDOS

### ❌ LO QUE NO PUEDES HACER
- Contactar directamente a alumnos que recibieron formación B2B
- Guardar emails/teléfonos de alumnos B2B
- Enviar campañas de email marketing a alumnos B2B
- Conectar con ellos en LinkedIn para venderles cursos B2C

---

### ✅ LO QUE SÍ PUEDES HACER

#### 1. **CAPTACIÓN DE NUEVAS EMPRESAS**

**Estrategia LinkedIn B2B:**
- Target: HR Managers, Training Managers, L&D Directors
- Mensaje: Ofrecer formación in-company
- Registrar en CRM como "empresa prospecto"

**Búsqueda LinkedIn:**
```
Filtros:
- Puesto: "HR Manager", "Training Manager", "L&D Director"
- Sector: Consultoría, Banca, Servicios financieros
- Tamaño empresa: 50-1000 empleados
- Ubicación: España
```

**Mensaje tipo:**
```
Hola [Nombre],

Vi que gestionas formación en [Empresa].

Ayudamos a empresas como [Empresa] a formar a sus equipos financieros
con cursos in-company personalizados.

¿Sería interesante conocernos 15 min?

Saludos,
[Tu nombre]
```

**En el CRM:**
```
companies → crear empresa
company_contacts → crear contacto (HR Manager)
Pipeline: "Prospección B2B"
```

---

#### 2. **UPSELL/CROSS-SELL A EMPRESAS EXISTENTES**

**Estrategia:**
- Contactar a empresas que YA son clientes
- Ofrecerles NUEVOS cursos
- Hablar con el contacto empresarial (no con los alumnos)

**Ejemplo:**
```
Empresa: Deloitte (ya hizo curso de Finanzas Corporativas)
Contacto: María García (HR Manager)

Email:
"Hola María,

Gracias por confiar en nosotros para el curso de Finanzas Corporativas
el año pasado.

Este año lanzamos un nuevo curso de Valoración de Empresas M&A.
¿Os interesaría para el equipo de Corporate Finance?

Podemos hacer una propuesta personalizada.

Saludos,
[Tu nombre]"
```

**En el CRM:**
```
companies → buscar "Deloitte"
company_contacts → buscar "María García"
agreements → crear nuevo acuerdo (propuesta)
Pipeline: "Propuesta enviada"
```

---

#### 3. **CONTENIDO DE VALOR PARA EMPRESAS**

**Estrategia:**
- Crear contenido educativo en LinkedIn dirigido a empresas
- Ej: "5 señales de que tu equipo financiero necesita formación"
- Las empresas te contactan (inbound B2B)

**En el CRM:**
```
Cuando una empresa contacta por LinkedIn:
- Crear empresa
- Crear contacto
- Source: "linkedin_inbound"
- Pipeline: "Inbound B2B"
```

---

#### 4. **NETWORKING Y EVENTOS**

**Estrategia:**
- Asistir a eventos de HR, formación empresarial
- Conocer decision makers de empresas
- Registrarlos en el CRM

**En el CRM:**
```
companies → crear empresa
company_contacts → crear contacto
Source: "networking_evento_[nombre]"
Pipeline: "Networking B2B"
```

---

#### 5. **ALIANZAS CON CONSULTORAS/HEADHUNTERS**

**Estrategia:**
- Alianzas con empresas que colocan profesionales
- Les ofreces formación para sus candidatos
- Win-win: ellos mejoran a candidatos, tú vendes cursos

**Ejemplo:**
```
Alianza con: Michael Page (headhunter)
Propuesta: "Formamos a tus candidatos junior en finanzas"
Beneficio para ellos: Candidatos mejor preparados
Beneficio para ti: Volumen de alumnos
```

**En el CRM:**
```
companies → crear "Michael Page"
Type: "partner"
Agreements: Acuerdo de colaboración
```

---

## 🔄 APROVECHAMIENTO INDIRECTO DE B2B PARA B2C

Aunque NO puedes contactar alumnos B2B, SÍ puedes aprovecharlos indirectamente:

### 1. **TESTIMONIALES (CON PERMISO)**
- Pedir a la empresa permiso para testimoniales
- "Empresa X formó a 20 profesionales con nosotros"
- Usar en marketing B2C

### 2. **CASOS DE ÉXITO CORPORATIVOS**
- "Ayudamos a Deloitte a formar a su equipo de M&A"
- Genera credibilidad para B2C
- Alumnos B2C ven que empresas top confían en ti

### 3. **REFINAMIENTO DE CONTENIDO**
- Aprendes qué temas funcionan en B2B
- Aplicas ese conocimiento a cursos B2C
- Mejora continua de programa formativo

### 4. **NETWORKING PASIVO**
- Alumnos B2B pueden recomendarte (ellos te buscan)
- No los contactas tú, pero si ellos te contactan → lead B2C válido
- En el CRM: Source: "referencia_alumno_b2b"

---

## 📊 DASHBOARD UNIFICADO B2B + B2C

### MÉTRICAS CLAVE

**Ingresos totales:**
```
┌─────────────────────────────────┐
│ INGRESOS TOTALES 2026           │
├─────────────────────────────────┤
│ B2C: 89,700€ (30 alumnos)       │
│ B2B: 120,000€ (4 empresas)      │
│ TOTAL: 209,700€                 │
└─────────────────────────────────┘
```

**Alumnos formados:**
```
┌─────────────────────────────────┐
│ ALUMNOS FORMADOS 2026           │
├─────────────────────────────────┤
│ B2C: 30 alumnos                 │
│ B2B: 60 alumnos (4 empresas)    │
│ TOTAL: 90 alumnos               │
└─────────────────────────────────┘
```

**Pipeline combinado:**
```
┌─────────────────────────────────┐
│ PIPELINE ACTIVO                 │
├─────────────────────────────────┤
│ Leads B2C: 45                   │
│ Empresas B2B prospecto: 8       │
│ Propuestas B2B activas: 3       │
│ Valor pipeline B2B: 95,000€     │
└─────────────────────────────────┘
```

---

## 🎯 ESTRATEGIA DE CAPTACIÓN B2B EN EL CRM

### PROCESO PASO A PASO

#### PASO 1: IDENTIFICACIÓN (LinkedIn Sales Navigator)

**Target empresas:**
```
Sector: Consultoría, Banca, Servicios financieros, Auditoría
Tamaño: 50-500 empleados
Ubicación: Madrid, Barcelona
Búsqueda: "financial services", "consulting firm"
```

**Exportar a CRM:**
- Crear 50 empresas en `companies`
- Status: "prospecto_identificado"

---

#### PASO 2: IDENTIFICACIÓN DE CONTACTOS

**Buscar dentro de cada empresa:**
```
Puesto: "HR Manager", "Training Manager", "People & Culture"
Dentro de: [Empresa objetivo]
```

**Añadir a CRM:**
- Crear contactos en `company_contacts`
- Vincular a empresa
- Rol: "decision_maker"

---

#### PASO 3: OUTREACH (LinkedIn o Email)

**Mensaje inicial:**
```
Hola [Nombre],

Vi que gestionas formación en [Empresa].

Trabajamos con [empresa similar] formando a equipos en finanzas corporativas
(modelaje financiero, valoración, M&A).

¿Sería interesante conocernos 15 min para ver si encaja con vuestras necesidades?

Saludos,
[Tu nombre]
Bespoke School of Finance
```

**En el CRM:**
- Pipeline: "Contacto inicial enviado"
- Registrar fecha de contacto
- Programar follow-up en 3 días

---

#### PASO 4: CUALIFICACIÓN (LLAMADA)

**Preguntas clave:**
- ¿Cuántas personas en el equipo financiero?
- ¿Hacéis formación in-company actualmente?
- ¿Presupuesto anual de formación?
- ¿Cuándo sería el timing ideal?

**En el CRM:**
- Si cualifica: Pipeline → "Cualificado"
- Si no cualifica: Status → "descartado"
- Registrar notas de la llamada

---

#### PASO 5: PROPUESTA

**Crear documento:**
```
Propuesta para: [Empresa]
Curso: [Nombre curso]
Alumnos: [X personas]
Precio: [Y €]
Modalidad: [Presencial/Online]
Fechas propuestas: [Fechas]
```

**En el CRM:**
- Crear `agreement` con status "propuesta"
- Adjuntar PDF de propuesta
- Pipeline: "Propuesta enviada"
- Fecha follow-up: +7 días

---

#### PASO 6: SEGUIMIENTO

**Email +7 días:**
```
Hola [Nombre],

¿Tuviste oportunidad de revisar la propuesta que te envié?

Si tienes dudas o necesitas ajustar algo, podemos hablarlo.

Saludos,
[Tu nombre]
```

**En el CRM:**
- Registrar follow-up
- Si responde → Pipeline: "Negociación"
- Si no responde → +7 días segundo follow-up

---

## 💡 CASOS DE USO PRÁCTICOS

### CASO 1: ALUMNO B2B CONTACTA PARA B2C

**Situación:**
- Empresa X contrató curso B2B
- Juan (alumno B2B) te escribe por LinkedIn: "Me gustó el curso, ¿tenéis cursos abiertos?"

**¿Qué hacer?**
✅ **SÍ puedes venderle** (él te contactó a ti, no violaste acuerdo)

**En el CRM:**
```
1. Crear nuevo lead en leads_b2c
   - Nombre: Juan Pérez
   - Email: juan.perez@gmail.com (personal, NO corporativo)
   - Source: "referencia_alumno_b2b"
   - Empresa_origen: "Empresa X"
   - Notas: "Realizó curso B2B en 2025, contactó por LinkedIn"

2. Pipeline B2C: "Inbound warm lead"

3. NO vincular con students_b2b (son registros separados por privacidad)
```

**Ventaja:**
- Es un lead caliente (ya te conoce)
- Alta probabilidad de conversión

---

### CASO 2: EMPRESA QUIERE LISTA DE ALUMNOS FORMADOS

**Situación:**
- Empresa Y pregunta: "¿Nos podéis pasar la lista de alumnos que formamos?"

**¿Qué hacer?**
✅ **SÍ puedes darles la lista** (son SU empresa)

**En el CRM:**
```
Query:
SELECT nombre_anonimizado, curso, fecha_inicio, fecha_fin, certificado
FROM students_b2b
WHERE empresa_id = [Empresa Y]

Resultado: Lista de alumnos con datos básicos
NO incluir: emails, teléfonos, LinkedIn (datos de contacto)
```

**Entregar:**
- PDF con lista de alumnos
- Certificados emitidos
- Fechas de asistencia

---

### CASO 3: LEAD B2C TRABAJA EN EMPRESA B2B CLIENTE

**Situación:**
- María (lead B2C) te contacta por Instagram
- Descubres que trabaja en Deloitte (cliente B2B)

**¿Qué hacer?**
✅ **SÍ puedes venderle B2C** (ella te contactó como particular)

**En el CRM:**
```
1. Crear lead_b2c normal
   - Nombre: María López
   - Email: maria.lopez.personal@gmail.com
   - Source: "instagram_ads"
   - Empresa_actual: "Deloitte" (pero es info contextual)
   - Notas: "Trabaja en Deloitte pero contacto como alumna B2C"

2. NO mencionar que Deloitte es cliente B2B (por privacidad)

3. Pipeline B2C normal
```

**Cuidado:**
- NO le digas "Sé que tu empresa es cliente nuestra"
- Trátala como lead B2C individual
- Si pregunta, puedes mencionar que trabajáis con empresas

---

## 🔐 PRIVACIDAD Y CUMPLIMIENTO

### GDPR Y PROTECCIÓN DE DATOS

**Datos B2B:**
```
✅ Guardar:
- Nombre empresa (público)
- Contactos empresariales que aceptaron contacto
- Acuerdos comerciales
- Datos agregados de alumnos (números, no identidades)

❌ NO guardar (alumnos B2B):
- Emails personales sin consentimiento
- Teléfonos móviles personales
- LinkedIn personal
- Datos sensibles
```

**Datos B2C:**
```
✅ Guardar (con consentimiento):
- Email
- Teléfono
- WhatsApp
- LinkedIn
- Conversaciones
- Historial de compras

Base legal: Consentimiento + Ejecución de contrato
```

---

### SEGREGACIÓN DE DATOS

**En Supabase:**

```sql
-- Alumnos B2B (mínimos datos)
CREATE TABLE students_b2b (
  id UUID PRIMARY KEY,
  empresa_id UUID REFERENCES companies(id),
  curso_id UUID REFERENCES courses(id),
  identificador TEXT, -- "Alumno_001", "Alumno_002"
  fecha_inicio DATE,
  fecha_fin DATE,
  certificado BOOLEAN,
  -- SIN email, telefono, datos contacto
);

-- Leads B2C (datos completos)
CREATE TABLE leads_b2c (
  id UUID PRIMARY KEY,
  nombre TEXT,
  email TEXT,
  telefono TEXT,
  whatsapp TEXT,
  linkedin TEXT,
  -- Todos los datos de contacto
);

-- NUNCA mezclar estas tablas
```

---

## 📈 ROADMAP DE IMPLEMENTACIÓN

### FASE 1: SOLO B2C (MES 1-3)
- Activar módulo B2C del CRM
- Captación de leads individuales
- Validar sistema

### FASE 2: AÑADIR B2B BÁSICO (MES 4-6)
- Crear módulo empresas
- Registrar empresas cliente actuales
- Registrar contactos empresariales
- NO activar aún captación B2B

### FASE 3: CAPTACIÓN B2B (MES 7-9)
- Iniciar outbound B2B en LinkedIn
- Prospección de nuevas empresas
- Pipeline B2B activo

### FASE 4: OPTIMIZACIÓN (MES 10-12)
- Análisis de datos B2B + B2C
- Identificar sinergias
- Escalar lo que funciona

---

## 🎯 RESUMEN EJECUTIVO

### ✅ SÍ PUEDES:
- Usar un CRM unificado B2B + B2C
- Registrar empresas y contactos empresariales
- Hacer captación B2B (empresas como leads)
- Contactar HR Managers, Training Managers
- Vender a alumnos B2B si ELLOS te contactan primero
- Aprovechar casos de éxito B2B para marketing B2C

### ❌ NO PUEDES:
- Contactar alumnos B2B directamente para venderles B2C
- Guardar emails/teléfonos de alumnos B2B sin permiso
- Violar acuerdos de confidencialidad con empresas
- Mezclar datos B2B y B2C sin control

### 🎯 ESTRATEGIA RECOMENDADA:
1. **CRM unificado** con dos módulos separados
2. **B2C:** Captación activa de individuos
3. **B2B:** Captación de empresas (no alumnos)
4. **Aprovechamiento pasivo:** Si alumnos B2B te buscan, bienvenidos
5. **Sinergias:** Casos de éxito, refinamiento de contenido

---

## 📞 SIGUIENTE PASO

¿Quieres que te prepare:
1. **Estructura de base de datos** detallada para B2B+B2C en Supabase
2. **Plantillas de LinkedIn** para captación B2B (empresas)
3. **Scripts de ventas B2B** (call inicial, follow-up, cierre)
4. **Dashboard combinado** en Supabase (métricas B2B+B2C)

---

**Este documento es estratégico, no técnico. Para implementación técnica, revisar SUPABASE_SETUP.md** 🚀
