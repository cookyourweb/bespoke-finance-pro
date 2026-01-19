import { motion } from "framer-motion";
import { AlertCircle, FileQuestion, TrendingDown, Users, Clock } from "lucide-react";

const painPoints = [
  {
    text: "Usas Excel a diario, pero no sabrías construir un modelo completo desde cero",
    icon: FileQuestion,
  },
  {
    text: "Dependes de plantillas que no entiendes del todo",
    icon: AlertCircle,
  },
  {
    text: "Ves ofertas interesantes, pero sabes que te falta nivel técnico",
    icon: TrendingDown,
  },
  {
    text: "En reuniones financieras, otros dominan el modelo y tú no",
    icon: Users,
  },
  {
    text: "Sientes que tu carrera podría avanzar mucho más rápido",
    icon: Clock,
  },
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
            La realidad de muchos profesionales en finanzas
          </h2>

          <div className="space-y-4">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-destructive/10 border border-destructive/20"
              >
                <point.icon className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                <span className="text-lg text-foreground">{point.text}</span>
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
            Si te reconoces aquí, este programa es para ti
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default PainPoints;
