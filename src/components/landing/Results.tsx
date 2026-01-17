import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Layers, PieChart, Shield, FileSearch, Cpu } from "lucide-react";

const outcomes = [
  {
    icon: Layers,
    title: "Construir modelos financieros desde cero",
    description: "Con estructura profesional y mejores prácticas del sector",
  },
  {
    icon: TrendingUp,
    title: "Modelar flujos de caja complejos",
    description: "Incluyendo escenarios y análisis de sensibilidad",
  },
  {
    icon: PieChart,
    title: "Valorar activos",
    description: "Mediante metodologías reales utilizadas en el mercado",
  },
  {
    icon: Shield,
    title: "Analizar rentabilidad y riesgos",
    description: "De proyectos de inversión de forma rigurosa",
  },
  {
    icon: FileSearch,
    title: "Auditar modelos de terceros",
    description: "Entender y validar modelos creados por otros profesionales",
  },
  {
    icon: Cpu,
    title: "Dominar Excel como herramienta estratégica",
    description: "Para análisis financiero avanzado",
  },
];

const Results = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="resultados" className="section-padding bg-primary text-primary-foreground">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary-foreground/70 font-semibold text-sm uppercase tracking-wider mb-4">
            Resultados
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance max-w-4xl mx-auto">
            Al finalizar el programa serás capaz de
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {outcomes.map((outcome, index) => {
            const Icon = outcome.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-2">{outcome.title}</h3>
                <p className="text-primary-foreground/70">{outcome.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-primary-foreground/10 rounded-2xl p-8 lg:p-12 text-center border border-primary-foreground/20"
        >
          <p className="text-xl lg:text-2xl font-medium leading-relaxed">
            Esto no es solo aprender Excel. Es adquirir una <span className="font-bold">competencia clave</span> utilizada por analistas financieros, consultores y equipos de inversión.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Results;
