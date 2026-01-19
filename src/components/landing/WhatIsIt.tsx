import { motion } from "framer-motion";

const WhatIsIt = () => {
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-8">
            Una formación pensada para subir de nivel profesional
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10">
            Formación práctica para profesionales de finanzas que quieren aprender a construir modelos financieros reales, como los que se usan en empresa, banca y consultoría.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6 text-lg text-foreground font-medium">
            <span className="px-6 py-3 bg-secondary rounded-lg">Nada de teoría innecesaria.</span>
            <span className="px-6 py-3 bg-secondary rounded-lg">Trabajo práctico, casos reales y acompañamiento directo.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIsIt;
