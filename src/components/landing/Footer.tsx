const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="section-container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">B</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-sm leading-tight">Bespoke School</span>
              <span className="text-muted-foreground text-xs leading-tight">of Finance</span>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Bespoke School of Finance. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
