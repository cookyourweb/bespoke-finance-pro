import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-relaxed">
            Si este año quieres dejar de quedarte fuera de oportunidades por tu nivel técnico,
            <br />
            <span className="text-white/90">este es el momento de dar el paso.</span>
          </h2>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            href="https://wa.me/34600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-white text-primary px-10 py-5 rounded-lg font-bold text-xl hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-6 h-6" />
            Solicitar plaza por WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
