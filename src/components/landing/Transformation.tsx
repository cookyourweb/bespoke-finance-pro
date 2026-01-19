import { motion } from "framer-motion";
import { Check } from "lucide-react";

const transformations = [
  "Entiendes qué hay detrás de los números, no solo el resultado",
  "Tomas decisiones financieras con criterio profesional",
  "Analizas empresas e inversiones con seguridad",
  "Tu perfil deja de ser 'junior' en Excel",
  "Accedes a más y mejores oportunidades profesionales",
];

const Transformation = () => {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-12 text-center">
            Cuando dominas modelos financieros reales…
          </h2>

          <div className="space-y-5">
            {transformations.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-white/10 border border-white/20"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-lg">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Transformation;
