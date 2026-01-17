import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Layers, PieChart, Shield, FileSearch, Sparkles } from "lucide-react";

const outcomes = [
  {
    icon: Layers,
    title: "Construir desde cero un modelo financiero completo",
    description: "En Excel para analizar inversiones reales",
  },
  {
    icon: TrendingUp,
    title: "Entender cómo valoran activos",
    description: "Empresas, fondos y consultoras",
  },
  {
    icon: PieChart,
    title: "Evaluar escenarios financieros",
    description: "Y tomar decisiones con criterio profesional",
  },
  {
    icon: FileSearch,
    title: "Interpretar y modificar modelos de terceros",
    description: "Con seguridad y criterio técnico",
  },
  {
    icon: Shield,
    title: "Diferenciarte en procesos de selección",
    description: "Para banca, consultoría, corporate finance o desarrollo de negocio",
  },
  {
    icon: Sparkles,
    title: "Añadir una skill altamente demandada",
    description: "Escasa en el mercado y muy valorada",
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
            Cuando termines este programa serás capaz de
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
      </div>
    </section>
  );
};

export default Results;
