import { motion } from "framer-motion";

const painPoints = [
  "Usas Excel todos los días, pero no te sientes realmente sólido",
  "Ves oportunidades interesantes y sabes que te falta nivel técnico",
  "Trabajas con modelos que no has construido tú",
  "En reuniones, otros hablan de modelos financieros y tú escuchas",
  "Sientes que tu carrera podría ir más rápido",
];

const PainPoints = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-12 text-center">
            Lo que le pasa a mucha gente en finanzas
          </h2>

          <div className="space-y-5">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-secondary/50 border border-border"
              >
                <span className="text-primary font-bold text-xl">–</span>
                <span className="text-lg text-foreground">{point}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PainPoints;
