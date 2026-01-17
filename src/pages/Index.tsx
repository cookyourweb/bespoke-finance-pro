import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import TargetAudience from "@/components/landing/TargetAudience";
import Results from "@/components/landing/Results";
import ProgramStructure from "@/components/landing/ProgramStructure";
import Pricing from "@/components/landing/Pricing";
import CTASection from "@/components/landing/CTASection";
import LeadForm from "@/components/landing/LeadForm";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <TargetAudience />
        <Results />
        <ProgramStructure />
        <Pricing />
        <CTASection />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
