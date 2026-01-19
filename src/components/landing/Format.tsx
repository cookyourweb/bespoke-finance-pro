import { motion } from "framer-motion";
import { MessageCircle, Video, Users, Headphones } from "lucide-react";

const features = [
  { icon: Video, label: "Modalidad blended: sesiones online + presenciales" },
  { icon: Users, label: "Sesiones presenciales en Madrid" },
  { icon: Headphones, label: "Grupo reducido para asegurar acompañamiento" },
  { icon: MessageCircle, label: "Acompañamiento académico durante el programa" },
];

const Format = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-12">
            Formato del programa
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center gap-4 p-6 bg-secondary rounded-xl"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="font-semibold text-foreground">{feature.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <a
              href="https://wa.me/34600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent transition-all shadow-card hover:shadow-card-hover"
            >
              <MessageCircle className="w-5 h-5" />
              Solicitar plaza por WhatsApp
            </a>
            <span className="text-muted-foreground font-medium">
              Plazas limitadas
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Format;
