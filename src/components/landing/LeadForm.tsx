import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle } from "lucide-react";
import { supabaseService } from "@/services/supabase.service";
import { brevoService } from "@/services/brevo.service";
import { whatsappService } from "@/services/whatsapp.service";

interface LeadData {
  nombre: string;
  email: string;
  telefono: string;
  perfil: string;
  modalidad: string;
  status: string;
  timestamp: string;
}

const perfilOptions = [
  "Graduado universitario buscando primer empleo",
  "Profesional en banca o finanzas",
  "Consultor/a",
  "Profesional de sector técnico/industrial",
  "Emprendedor/a o empresario/a",
  "Otro",
];

const modalidadOptions = [
  "Presencial (Madrid)",
  "Online",
  "Me es indiferente",
];

const LeadForm = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    perfil: "",
    modalidad: "",
  });

  // Track page view on mount
  useEffect(() => {
    const utmParams = supabaseService.getUTMParams();
    supabaseService.trackEvent({
      event_name: 'page_view',
      event_category: 'engagement',
      properties: {
        page: 'lead_form',
        ...utmParams
      },
      ...utmParams
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validación básica
    if (!formData.nombre || !formData.email || !formData.telefono || !formData.perfil) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, completa todos los campos obligatorios.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, introduce un email válido.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Track form submission attempt
    await supabaseService.trackEvent({
      event_name: 'form_submitted',
      event_category: 'conversion',
      properties: {
        perfil: formData.perfil,
        modalidad: formData.modalidad
      }
    });

    // Obtener UTM parameters
    const utmParams = supabaseService.getUTMParams();

    // Mapear perfil profesional al formato de Supabase
    const perfilMap: Record<string, string> = {
      "Graduado universitario buscando primer empleo": "graduado",
      "Profesional en banca o finanzas": "profesional_finanzas",
      "Consultor/a": "consultor",
      "Profesional de sector técnico/industrial": "profesional_tecnico",
      "Emprendedor/a o empresario/a": "emprendedor",
      "Otro": "otro"
    };

    // Crear objeto lead con todos los datos
    const leadDataForSupabase = {
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      perfil_profesional: perfilMap[formData.perfil] || formData.perfil,
      modalidad_preferida: formData.modalidad || undefined,
      status: "nuevo_lead",
      source: "landing",
      landing_page: window.location.href,
      ...utmParams
    };

    // Para Brevo (formato legacy)
    const leadDataForBrevo: LeadData = {
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      perfil: formData.perfil,
      modalidad: formData.modalidad,
      status: "nuevo_lead",
      timestamp: new Date().toISOString(),
    };

    try {
      // 1. Guardar en localStorage (backup local)
      const existingLeads = JSON.parse(localStorage.getItem("bespoke_leads") || "[]");
      existingLeads.push(leadDataForBrevo);
      localStorage.setItem("bespoke_leads", JSON.stringify(existingLeads));

      // 2. SUPABASE - Base de datos principal (Source of Truth)
      const supabaseResponse = await supabaseService.createLead(leadDataForSupabase);

      let leadId: string | undefined;

      if (supabaseResponse.success) {
        console.log('✅ Lead guardado en Supabase (DB principal)');
        leadId = supabaseResponse.data?.id;
      } else {
        console.warn('⚠️ Error al guardar en Supabase:', supabaseResponse.error);
        // Continuar aunque Supabase falle (tenemos localStorage)
      }

      // 3. BREVO - CRM secundario para email marketing
      const brevoResponse = await brevoService.createContact(leadDataForBrevo);

      if (brevoResponse.success) {
        console.log('✅ Lead sincronizado con Brevo (email marketing)');
      } else {
        console.warn('⚠️ Error al sincronizar con Brevo:', brevoResponse.error);
        // No es crítico si falla Brevo, ya tenemos el lead en Supabase
      }

      // 4. Track conversion event
      if (leadId) {
        await supabaseService.trackEvent({
          lead_id: leadId,
          event_name: 'lead_created',
          event_category: 'conversion',
          properties: {
            source: 'landing_form',
            perfil: formData.perfil
          }
        });
      }

      // 5. Éxito - Mostrar mensaje y ofrecer WhatsApp
      setIsSubmitted(true);
      setIsSubmitting(false);

      toast({
        title: "¡Solicitud recibida!",
        description: "Nos pondremos en contacto contigo muy pronto.",
      });

      // 6. Auto-abrir WhatsApp después de 2 segundos (opcional)
      setTimeout(() => {
        const shouldOpenWhatsApp = window.confirm(
          "¿Quieres agendar una llamada ahora mismo por WhatsApp? 📱"
        );

        if (shouldOpenWhatsApp) {
          // Track WhatsApp click
          if (leadId) {
            supabaseService.trackEvent({
              lead_id: leadId,
              event_name: 'whatsapp_clicked',
              event_category: 'engagement'
            });
          }

          whatsappService.redirectToWhatsApp({
            nombre: formData.nombre,
            email: formData.email,
            telefono: formData.telefono
          });
        }
      }, 2000);

    } catch (error) {
      console.error('❌ Error al procesar el formulario:', error);

      // Track error
      await supabaseService.trackEvent({
        event_name: 'form_error',
        event_category: 'error',
        properties: {
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      });

      toast({
        title: "Error al enviar",
        description: "Hubo un problema. Por favor, intenta nuevamente o contáctanos por WhatsApp.",
        variant: "destructive",
      });

      setIsSubmitting(false);
    }
  };

  return (
    <section id="inscripcion" className="section-padding bg-primary/5">
      <div className="section-container" ref={ref}>
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Inscripción
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Solicita tu plaza
            </h2>
            <p className="text-muted-foreground text-lg">
              Completa el formulario y nos pondremos en contacto contigo
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isSubmitted ? (
              <div className="bg-card rounded-3xl shadow-card p-12 text-center border border-border">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">¡Gracias por tu interés!</h3>
                <p className="text-muted-foreground">
                  Hemos recibido tu solicitud. Un miembro de nuestro equipo se pondrá en contacto contigo en las próximas 24-48 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card rounded-3xl shadow-card p-8 lg:p-12 border border-border">
                <div className="grid gap-6">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-semibold text-foreground mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="telefono" className="block text-sm font-semibold text-foreground mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="+34 600 000 000"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="perfil" className="block text-sm font-semibold text-foreground mb-2">
                      Perfil profesional *
                    </label>
                    <select
                      id="perfil"
                      name="perfil"
                      value={formData.perfil}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Selecciona tu perfil</option>
                      {perfilOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="modalidad" className="block text-sm font-semibold text-foreground mb-2">
                      ¿Cómo prefieres asistir?
                    </label>
                    <select
                      id="modalidad"
                      name="modalidad"
                      value={formData.modalidad}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Selecciona una opción</option>
                      {modalidadOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-accent transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Solicitar plaza
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-6">
                  Al enviar este formulario, aceptas nuestra política de privacidad y el tratamiento de tus datos.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
