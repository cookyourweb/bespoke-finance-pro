import { motion } from "framer-motion";
import { Target } from "lucide-react";

const problems = [
  "Distinguir si una empresa genera valor real o solo 'aparenta'",
  "Entender el cash flow más allá del beneficio contable",
  "Analizar el impacto real de la deuda y la estructura financiera",
  "Evaluar inversiones y comparar escenarios con Excel",
  "Tomar decisiones financieras basadas en modelos sólidos",
];

const learnings = [
  "Construir modelos financieros desde cero con una estructura clara y replicable",
  "Interpretar y adaptar modelos financieros existentes con solvencia",
  "Analizar inversiones, escenarios y decisiones financieras reales",
  "Trabajar con la lógica que se usa en empresa, banca y consultoría",
];

const PracticalSkills = () => {
  return (
    <section id="aprendizaje" className="py-20 md:py-28 bg-background">
      <div className="section-container">
        <div className="max-w-4xl mx-auto space-y-20">
          {/* Problems you'll solve */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6 text-center">
              Qué vas a saber hacer al terminar el programa
            </h2>

            <div className="space-y-4 mt-10">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-5 rounded-xl bg-secondary/50 border border-border"
                >
                  <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-lg text-foreground">{problem}</span>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="text-center text-primary font-semibold text-lg mt-10"
            >
              Formación aplicada, no teoría académica
            </motion.p>
          </motion.div>

          {/* What you'll learn */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-10 text-center">
              Qué aprenderás de forma práctica
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {learnings.map((learning, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-primary/5 border border-primary/10"
                >
                  <span className="text-lg text-foreground leading-relaxed">{learning}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PracticalSkills;
