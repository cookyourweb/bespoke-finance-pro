import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Users, Video, Award, BookOpen, Headphones } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Online en directo",
    description: "Sesiones interactivas con profesores expertos",
  },
  {
    icon: Users,
    title: "Sesiones presenciales",
    description: "Workshops intensivos prácticos",
  },
  {
    icon: Headphones,
    title: "Acompañamiento continuo",
    description: "Soporte académico durante todo el programa",
  },
  {
    icon: BookOpen,
    title: "Campus Virtual",
    description: "Grabaciones y materiales siempre disponibles",
  },
  {
    icon: Award,
    title: "Diploma acreditativo",
    description: "Certificación al completar el programa",
  },
];

const ProgramStructure = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-card">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Estructura
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Programa completo de 24 horas
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-8">
              <div className="relative pl-8 border-l-2 border-primary/20">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Clock className="w-3 h-3 text-primary" />
                </div>
                <div className="bg-secondary/50 rounded-2xl p-6 border border-border">
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">Fase 1 · Opcional</span>
                  <h3 className="text-xl font-bold text-foreground mt-2 mb-2">Nivelación en Excel Financiero</h3>
                  <p className="text-muted-foreground mb-3">Fundamentos esenciales para empezar con base sólida</p>
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Clock className="w-4 h-4" />
                    <span>6 horas</span>
                  </div>
                </div>
              </div>

              <div className="relative pl-8 border-l-2 border-primary">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Clock className="w-3 h-3 text-primary-foreground" />
                </div>
                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">Fase 2 · Core</span>
                  <h3 className="text-xl font-bold text-foreground mt-2 mb-2">Modelización Financiera Avanzada</h3>
                  <p className="text-muted-foreground mb-3">Construcción de un modelo completo desde cero paso a paso</p>
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Clock className="w-4 h-4" />
                    <span>16 horas</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-foreground mb-6">Metodología Blended</h3>
            <div className="grid gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProgramStructure;
