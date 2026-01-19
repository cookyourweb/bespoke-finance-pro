import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 md:pt-24 bg-secondary">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-primary/3 to-transparent" />
      </div>

      <div className="section-container relative z-10 py-16 md:py-24">
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground leading-tight mb-8 text-balance"
          >
            Si no sabes construir modelos financieros reales, estás fuera de muchas oportunidades.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl leading-relaxed"
          >
            Enero es cuando muchos deciden subir de nivel profesional.
            <br />
            En finanzas, eso empieza por dominar Excel de verdad.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <a
              href="https://wa.me/34600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent transition-all shadow-card hover:shadow-card-hover"
            >
              <MessageCircle className="w-5 h-5" />
              Solicitar plaza por WhatsApp
            </a>
            <span className="text-muted-foreground font-medium">
              Plazas limitadas · Grupo reducido
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
