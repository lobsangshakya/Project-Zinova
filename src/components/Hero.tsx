import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background opacity-60" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
          Zinova
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Empowering sustainability through technology
        </p>
        
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Connecting farmers, restaurants, and NGOs to fight food waste and hunger with AI-powered solutions
        </p>
        
        <div className="pt-4">
          <Button 
            size="lg" 
            onClick={scrollToAbout}
            className="group"
            variant="hero"
          >
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;