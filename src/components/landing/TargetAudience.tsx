import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, LineChart, Target } from "lucide-react";

const profiles = [
  {
    icon: GraduationCap,
    title: "Graduados en ADE, Finanzas o Ingeniería",
    description: "Que quieran acceder a consultoría o banca",
  },
  {
    icon: Briefcase,
    title: "Profesionales técnicos",
    description: "Que necesitan entender la lógica financiera de proyectos",
  },
  {
    icon: LineChart,
    title: "Consultores o analistas",
    description: "Que quieran dominar Excel financiero profesional",
  },
  {
    icon: Target,
    title: "Perfiles sin experiencia previa",
    description: "Que quieran adquirir una skill premium diferencial",
  },
];

const TargetAudience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="programa" className="section-padding bg-card">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            ¿Para quién es?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance max-w-4xl mx-auto">
            Este programa es para ti si...
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {profiles.map((profile, index) => {
            const Icon = profile.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="flex gap-5 p-6 lg:p-8 rounded-2xl bg-secondary/50 border border-border hover:shadow-card transition-all group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-2">{profile.title}</h3>
                  <p className="text-muted-foreground">{profile.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-primary/5 border border-primary/10 rounded-2xl p-8 text-center"
        >
          <p className="text-lg text-foreground font-medium">
            <span className="text-primary font-bold">Si sabes usar Excel de forma básica</span>, puedes aprender modelización financiera profesional.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TargetAudience;
