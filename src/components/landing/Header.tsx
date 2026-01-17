import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border"
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">B</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-sm md:text-base leading-tight">
                Bespoke School
              </span>
              <span className="text-muted-foreground text-xs md:text-sm leading-tight">
                of Finance
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#programa" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
              Programa
            </a>
            <a href="#resultados" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
              Resultados
            </a>
            <a href="#precio" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
              Precio
            </a>
          </nav>

          <a
            href="#inscripcion"
            className="bg-primary text-primary-foreground px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-semibold text-sm hover:bg-accent transition-colors"
          >
            Reservar Plaza
          </a>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
