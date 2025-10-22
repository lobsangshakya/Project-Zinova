import { Leaf } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-card">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            How Zinova Works 🤝
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </div>
        
        <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-4">
          <p className="text-center max-w-3xl mx-auto">
            Zinova is an innovative platform that tackles food waste and hunger using cutting-edge technology. 
            We create a seamless connection between those with surplus food and communities in need. 🌱
          </p>
          
          <p className="text-center max-w-3xl mx-auto">
            By leveraging AI-driven matching algorithms, blockchain transparency, and real-time logistics optimization, 
            we ensure that no edible food goes to waste while helping feed those who need it most. 🚀
          </p>
        </div>
        
        <div className="flex justify-center pt-4">
          <Leaf className="h-12 w-12 text-green-500" />
        </div>
      </div>
    </section>
  );
};

export default About;