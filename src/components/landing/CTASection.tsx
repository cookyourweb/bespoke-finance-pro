import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users } from "lucide-react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-card">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-primary rounded-3xl p-8 lg:p-16 text-center text-primary-foreground"
        >
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 mb-6">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Plazas limitadas</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
              Las plazas son limitadas para garantizar una experiencia personalizada
            </h2>
            
            <p className="text-primary-foreground/80 text-lg mb-8">
              Solo 20 plazas por edición. Reserva la tuya y asegura tu formación.
            </p>
            
            <a
              href="#inscripcion"
              className="inline-flex items-center justify-center bg-primary-foreground text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-foreground/90 transition-colors"
            >
              Solicitar información
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
