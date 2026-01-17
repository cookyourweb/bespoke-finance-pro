import { motion } from "framer-motion";
import { Check } from "lucide-react";

const benefits = [
  "Construirás un modelo financiero completo desde una hoja en blanco",
  "Aprenderás a valorar activos y proyectos de forma estructurada",
  "Serás capaz de analizar modelos de terceros con criterio profesional",
  "Adquirirás una habilidad directamente aplicable en banca, consultoría y corporate finance",
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 md:pt-24 bg-secondary">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-primary/3 to-transparent" />
      </div>

      <div className="section-container relative z-10 py-16 md:py-24">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium">Programa de Alto Rendimiento</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground leading-tight mb-6 text-balance"
          >
            Domina la Modelización Financiera desde Cero y Construye Modelos Profesionales como los Analistas de Banca y Consultoría
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl leading-relaxed"
          >
            Aprende paso a paso a crear modelos financieros reales utilizados para valorar activos, analizar proyectos y estructurar operaciones — incluso si nunca has modelado antes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid gap-4 mb-10"
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground font-medium">{benefit}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <a
              href="#inscripcion"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent transition-all shadow-card hover:shadow-card-hover"
            >
              Reservar Plaza
            </a>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-card" />
                <div className="w-8 h-8 rounded-full bg-primary/30 border-2 border-card" />
                <div className="w-8 h-8 rounded-full bg-primary/40 border-2 border-card" />
              </div>
              <span className="text-sm font-medium">Solo 20 plazas · Grupo reducido</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
