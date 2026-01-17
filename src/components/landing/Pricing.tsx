import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Building2 } from "lucide-react";

const included = [
  "24 horas de formación (6h nivelación + 16h avanzado)",
  "Sesiones online en directo + presenciales",
  "Acompañamiento académico continuo",
  "Acceso al Campus Bespoke con grabaciones",
  "Materiales y plantillas descargables",
  "Diploma acreditativo",
];

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="precio" className="section-padding bg-secondary">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Inversión
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-12">
            Una habilidad con retorno inmediato
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-3xl shadow-card-hover border border-border overflow-hidden"
          >
            <div className="p-8 lg:p-12">
              <div className="mb-8">
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-6xl lg:text-7xl font-black text-foreground">695</span>
                  <span className="text-2xl font-bold text-muted-foreground">€</span>
                </div>
                <p className="text-muted-foreground">Pago único · IVA incluido</p>
              </div>

              <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10 mb-8">
                <Building2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground font-medium">Bonificable por Fundae para empresas</span>
              </div>

              <div className="grid gap-3 text-left mb-8">
                {included.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="#inscripcion"
                className="block w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-accent transition-colors"
              >
                Reservar Plaza
              </a>
            </div>

            <div className="bg-muted/50 p-6 border-t border-border">
              <p className="text-muted-foreground text-sm">
                Una inversión en una habilidad técnica con impacto directo en tu perfil profesional.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
