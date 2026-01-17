import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Final CTA */}
      <div className="section-container py-20" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-relaxed">
            La modelización financiera es una de las habilidades más demandadas en el mercado
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Este programa te permite adquirirla de forma práctica, estructurada y aplicada a casos reales.
          </p>
          <a
            href="#inscripcion"
            className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-foreground/90 transition-colors group"
          >
            Reservar Plaza Ahora
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-primary-foreground/10">
        <div className="section-container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">B</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight">Bespoke School</span>
                <span className="text-primary-foreground/60 text-xs leading-tight">of Finance</span>
              </div>
            </div>
            
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} Bespoke School of Finance. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
