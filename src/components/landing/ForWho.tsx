import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const forYou = [
  "Trabajas o quieres trabajar en finanzas",
  "Usas Excel y quieres dominarlo de verdad",
  "Este año quieres tomarte tu carrera en serio",
];

const notForYou = [
  "Buscas solo teoría",
  "No quieres practicar",
  "No vas a dedicarle tiempo",
];

const ForWho = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="section-container">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* For You */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-background rounded-2xl p-8 md:p-10 shadow-card"
            >
              <h3 className="text-2xl md:text-3xl font-black text-foreground mb-8">
                Este programa es para ti si:
              </h3>
              <div className="space-y-5">
                {forYou.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-lg text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Not For You */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-background rounded-2xl p-8 md:p-10 shadow-card"
            >
              <h3 className="text-2xl md:text-3xl font-black text-foreground mb-8">
                No es para ti si:
              </h3>
              <div className="space-y-5">
                {notForYou.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center mt-0.5">
                      <X className="w-4 h-4 text-destructive" />
                    </div>
                    <span className="text-lg text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWho;
