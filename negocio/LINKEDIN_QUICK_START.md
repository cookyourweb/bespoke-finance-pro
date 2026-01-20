# ⚡ LINKEDIN QUICK START - EMPEZAR HOY (30 MIN)

---

## 🎯 OBJETIVO

En los próximos 30 minutos vas a:
- ✅ Configurar Waalaxy (herramienta de semi-automatización)
- ✅ Lanzar tu primera campaña de prospección
- ✅ Enviar 20 solicitudes de conexión a leads cualificados

---

## ⏱️ PASO 1: CREAR CUENTA WAALAXY (5 min)

1. **Ir a:** https://www.waalaxy.com/
2. **Crear cuenta** (7 días gratis, no necesitas tarjeta)
3. **Descargar extensión Chrome:**
   - Waalaxy te redirigirá automáticamente
   - Clic en "Añadir a Chrome"
4. **Conectar LinkedIn:**
   - Abrir LinkedIn en otra pestaña
   - Waalaxy detectará la sesión automáticamente
5. ✅ **Verificar conexión** (icono de Waalaxy en LinkedIn)

---

## ⏱️ PASO 2: BUSCAR LEADS EN LINKEDIN (5 min)

1. **Ir a LinkedIn** y hacer clic en el buscador
2. **Seleccionar "Personas"**
3. **Aplicar filtros:**
   - **Ubicación:** España
   - **Sector:** Consultoría, Servicios financieros, Banca
   - **Nivel de antigüedad:** Practicante, Nivel inicial

4. **Búsqueda avanzada** (palabras clave en el buscador):
   ```
   "Financial Analyst" OR "Consultor" OR "Auditor" OR "Estudiante ADE"
   ```

5. **Revisar resultados:** Deberías ver perfiles de juniors en finanzas
6. ✅ **Guardar búsqueda** (botón arriba a la derecha)

---

## ⏱️ PASO 3: IMPORTAR LEADS A WAALAXY (3 min)

1. **Clic en el icono de Waalaxy** (esquina superior derecha en LinkedIn)
2. **Seleccionar "Import from search"**
3. **Elegir la búsqueda** que acabas de guardar
4. **Importar primeros 50 leads**
5. ✅ Leads importados a Waalaxy

---

## ⏱️ PASO 4: CREAR CAMPAÑA (10 min)

### A. Configurar secuencia

1. En Waalaxy, **clic en "New campaign"**
2. **Seleccionar secuencia:**
   - Visit profile
   - Wait 2 days
   - Send connection request (sin nota)
   - Wait 3 days
   - Send message

3. **Configurar mensaje:**

**Mensaje 1 (después de aceptar conexión):**
```
Hola {firstName},

Gracias por conectar! Vi que estás en {company} como {position}.

Yo ayudo a profesionales junior en finanzas a acelerar su carrera.
¿Cómo va todo por {company}?

Saludos,
[Tu nombre]
```

4. **Configurar límites seguros:**
   - Daily invitation limit: **25**
   - Daily message limit: **20**

5. ✅ **Guardar campaña**

---

### B. Activar campaña

1. **Revisar leads** seleccionados (50 perfiles)
2. **Clic en "Start campaign"**
3. ✅ **Campaña activa**

Waalaxy empezará a:
- Visitar perfiles automáticamente
- Enviar solicitudes de conexión (25/día)
- Enviar mensajes cuando acepten (automático)

---

## ⏱️ PASO 5: MONITORIZAR (2 min)

1. **Dashboard de Waalaxy:**
   - Invitations sent: Cuántas solicitudes enviadas
   - Acceptance rate: % de aceptaciones
   - Replies: Cuántos responden
   - Positive replies: Cuántos están interesados

2. ✅ **Revisar diariamente** (5 min/día)

---

## ⏱️ PASO 6: QUÉ PASA AHORA (próximos 7 días)

### Día 1-2:
- Waalaxy visita perfiles automáticamente
- Envía 25 solicitudes/día
- **No esperes respuestas aún**

### Día 3-5:
- Primeras aceptaciones (15-30%)
- Waalaxy envía mensaje 1 automáticamente
- **Empiezan a llegar respuestas**

### Día 6-7:
- Primeros leads interesados
- **TÚ respondes manualmente** a los interesados
- Derivas a WhatsApp
- Registras en CRM

---

## 📊 RESULTADOS ESPERADOS (PRIMERA SEMANA)

| Métrica | Resultado |
|---------|-----------|
| Solicitudes enviadas | 150-175 |
| Aceptaciones | 40-60 (25-35%) |
| Mensajes enviados | 40-60 |
| Respuestas | 8-15 (15-25%) |
| Leads interesados | 2-5 |

---

## 🔄 QUÉ HACER CUANDO ALGUIEN RESPONDE

### Si responde positivamente ("Sí, cuéntame más"):

**Mensaje manual:**
```
Genial!

Te paso el link: https://bespoke-finance-pro.vercel.app/

Es un programa intensivo de 8 semanas de finanzas corporativas.
Aprenderás modelaje financiero, valoración, análisis avanzado.

Si tienes dudas, podemos hablar 15 min por WhatsApp: [tu número]

Saludos!
```

### Si responde neutral ("Cuéntame más"):

**Mensaje manual:**
```
Claro!

Enseñamos finanzas corporativas a nivel profesional:
- Modelaje financiero (DCF, LBO, M&A)
- Valoración de empresas
- Excel y PowerPoint avanzado

Son 8 semanas intensivas. Perfecto para dar el salto a [puesto senior].

¿Te interesa que te pase más detalles?
```

### Si responde negativo ("No me interesa"):

**Mensaje manual:**
```
Sin problema, {firstName}!

Si cambia tu situación, aquí estoy.
Mucho éxito en {company}!
```

**Y SIEMPRE:** Registrar en CRM como "no_interesado" (para futuros cursos)

---

## 📝 REGISTRO EN CRM (OBLIGATORIO)

**Cada lead que responde positivo:**

1. Ir a Supabase CRM
2. Crear nuevo lead:
   ```
   Nombre: [Nombre completo]
   Email: [Si lo comparte]
   Teléfono: [Si lo comparte]
   LinkedIn: [URL del perfil]
   Empresa: [Empresa actual]
   Puesto: [Puesto actual]
   Estado: contactado_linkedin
   Fuente: linkedin_outreach
   Temperatura: tibio
   Notas: "Interesado en [tema]. Contactado el [fecha]"
   ```
3. Guardar

---

## ⚙️ AUTOMATIZACIÓN AVANZADA (OPCIONAL)

Si quieres automatizar el registro en CRM:

1. **Crear cuenta Zapier** (gratis hasta 100 acciones/mes)
2. **Crear Zap:**
   - Trigger: "New positive reply in Waalaxy"
   - Action: "Create row in Supabase"
3. **Mapear campos:**
   - Nombre → leads.nombre
   - LinkedIn URL → leads.linkedin_url
   - Empresa → leads.empresa
   - Estado → "contactado_linkedin"
4. **Activar Zap**

**Resultado:** Cada lead interesado se registra automáticamente en el CRM

---

## 📈 ESCALADO (SEMANA 2+)

### Si funciona (5+ leads interesados/semana):

**Semana 2:**
- Aumentar a 100 leads/campaña
- Añadir segundo mensaje de follow-up
- Optimizar copy según respuestas

**Semana 3-4:**
- Probar diferentes públicos (Ads, startups, corporates)
- A/B test de mensajes
- Aumentar a 150 leads/campaña

**Mes 2:**
- Escalar a 200-300 leads/campaña
- Considerar LinkedIn Sales Navigator (80 €/mes)
- Considerar contratar VA para respuestas manuales

---

## ⚠️ REGLAS DE ORO (NO ROMPER)

### ✅ SÍ HACER:
- Respetar límites de 25 invitaciones/día
- Personalizar mensajes (usar {variables})
- Responder rápido a los interesados (< 24h)
- Registrar TODO en CRM
- Dar valor antes de pedir

### ❌ NO HACER:
- Enviar más de 100 invitaciones/semana (al inicio)
- Vender en el primer mensaje
- Copy-paste sin personalización
- Ignorar respuestas negativas (siempre agradecer)
- Olvidar registrar en CRM

---

## 🎯 CHECKLIST FINAL (¿LO TIENES TODO?)

**Setup inicial:**
- [ ] Cuenta Waalaxy creada
- [ ] Extensión Chrome instalada
- [ ] LinkedIn conectado
- [ ] Primera búsqueda guardada
- [ ] 50 leads importados
- [ ] Campaña configurada con mensaje personalizado
- [ ] Límites configurados (25 invitaciones/día)
- [ ] Campaña activada

**Próximos 7 días:**
- [ ] Revisar dashboard diariamente (5 min)
- [ ] Responder manualmente a los interesados
- [ ] Derivar a WhatsApp los leads cualificados
- [ ] Registrar en CRM todos los leads interesados
- [ ] Publicar 1-2 posts de valor en LinkedIn

---

## 🚀 ÚLTIMO PASO

**AHORA MISMO:**

1. Abre esta URL: https://www.waalaxy.com/
2. Crea tu cuenta
3. Sigue los pasos de arriba (30 min)
4. ✅ Primera campaña activa

**EN 7 DÍAS:**

- Revisar resultados
- Optimizar mensajes
- Escalar a 100 leads/campaña

---

## 💡 TIPS FINALES

### Para mejorar tasa de aceptación:
- Optimiza tu perfil (foto, titular, sobre mí)
- Publica contenido de valor (3 posts/semana)
- Visita perfiles antes de conectar (Waalaxy lo hace automático)

### Para mejorar tasa de respuesta:
- Personaliza mensajes (menciona empresa/puesto)
- Ofrece valor antes de pedir (comparte recurso útil)
- No vendas de inmediato (construye relación)

### Para escalar resultados:
- A/B test de mensajes (probar diferentes versiones)
- Segmentar audiencias (consultoras vs. bancos vs. startups)
- Crear contenido específico para cada público

---

## 📞 ¿NECESITAS AYUDA?

**Revisa estos documentos:**
- `ESTRATEGIA_LINKEDIN_BESPOKE.md` → Estrategia completa (20+ páginas)
- `LINKEDIN_PLAN_ACCION.md` → Plan de acción detallado (1 página)
- `LINKEDIN_QUICK_START.md` → Este documento (inicio rápido)

---

**¡EMPIEZA AHORA!** ⚡

En 30 minutos puedes tener tu primera campaña activa.
En 7 días tendrás tus primeros leads cualificados.
En 30 días estarás generando 20-50 leads/mes.

**¡A por ello!** 🚀
