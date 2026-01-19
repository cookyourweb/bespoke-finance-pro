import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import PainPoints from "@/components/landing/PainPoints";
import Transformation from "@/components/landing/Transformation";
import PracticalSkills from "@/components/landing/PracticalSkills";
import ForWho from "@/components/landing/ForWho";
import Format from "@/components/landing/Format";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <Transformation />
        <PracticalSkills />
        <ForWho />
        <Format />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
