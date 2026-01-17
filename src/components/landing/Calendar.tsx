import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar as CalendarIcon, MapPin, Monitor } from "lucide-react";

const sessions = [
  {
    type: "online",
    date: "Martes 4 de marzo",
    time: "18:00 - 20:00",
    title: "Sesión Online 1",
    description: "Introducción y estructura del modelo",
  },
  {
    type: "online",
    date: "Jueves 6 de marzo",
    time: "18:00 - 20:00",
    title: "Sesión Online 2",
    description: "Hipótesis operativas y capex",
  },
  {
    type: "presencial",
    date: "Sábado 8 de marzo",
    time: "09:00 - 14:00",
    title: "Sesión Presencial 1",
    location: "Hotel Westin Cuzco, Madrid",
    description: "Estados financieros y flujos de caja",
  },
  {
    type: "online",
    date: "Martes 11 de marzo",
    time: "18:00 - 20:00",
    title: "Sesión Online 3",
    description: "Financiación y análisis de escenarios",
  },
  {
    type: "online",
    date: "Jueves 13 de marzo",
    time: "18:00 - 20:00",
    title: "Sesión Online 4",
    description: "Valoración y métricas de rentabilidad",
  },
  {
    type: "presencial",
    date: "Sábado 15 de marzo",
    time: "09:00 - 14:00",
    title: "Sesión Presencial 2",
    location: "Hotel Westin Cuzco, Madrid",
    description: "Modelo completo y presentación final",
  },
];

const Calendar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="calendario" className="section-padding bg-secondary">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Calendario
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Próxima convocatoria: Marzo 2025
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Programa intensivo de 2 semanas con sesiones online y presenciales
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              className={`p-6 rounded-2xl border ${
                session.type === "presencial"
                  ? "bg-primary/5 border-primary/20"
                  : "bg-card border-border"
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                {session.type === "presencial" ? (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <MapPin className="w-3 h-3" />
                    Presencial
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                    <Monitor className="w-3 h-3" />
                    Online
                  </div>
                )}
              </div>

              <h3 className="font-bold text-foreground text-lg mb-2">{session.title}</h3>
              <p className="text-muted-foreground mb-4">{session.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-foreground">
                  <CalendarIcon className="w-4 h-4 text-primary" />
                  <span className="font-medium">{session.date}</span>
                </div>
                <div className="text-muted-foreground pl-6">
                  {session.time}
                </div>
                {session.location && (
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <MapPin className="w-4 h-4" />
                    {session.location}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Calendar;
