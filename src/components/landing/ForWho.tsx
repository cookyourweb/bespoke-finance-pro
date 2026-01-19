import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";

const forYou = [
  "Tienes formación en ADE, Finanzas, Economía o Ingeniería",
  "Trabajas (o quieres trabajar) en finanzas, consultoría, banca o corporate",
  "Usas Excel y quieres llevarlo a un nivel profesional real",
  "Este año quieres tomarte tu carrera en serio",
];

const notForYou = [
  "No utilizas Excel de forma habitual",
  "Buscas algo básico o introductorio",
  "No quieres practicar ni enfrentarte a modelos reales",
];

const careerPaths = [
  "M&A (Fusiones y Adquisiciones)",
  "Project Finance",
  "Desarrollo de Negocio",
  "Real Estate y Asset Management",
];

const ForWho = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-12 text-center"
          >
            ¿Para quién es este programa?
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* For you */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-background rounded-2xl p-8 border border-border"
            >
              <h3 className="text-xl font-bold text-foreground mb-6">
                Este programa es para ti si:
              </h3>
              <div className="space-y-4">
                {forYou.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Not for you */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-background rounded-2xl p-8 border border-border"
            >
              <h3 className="text-xl font-bold text-foreground mb-6">
                No es para ti si:
              </h3>
              <div className="space-y-4">
                {notForYou.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center mt-0.5">
                      <X className="w-4 h-4 text-destructive" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Career paths */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Dónde te puede impulsar este curso
            </h3>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {careerPaths.map((path, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-2 px-5 py-3 bg-primary/10 rounded-full"
                >
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">{path}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-primary font-semibold text-lg">
              No es un curso para aprobar — es una competencia para tu carrera
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ForWho;
