import { useState, useEffect } from "react";
import { Apple, Wheat, Truck, Users, Heart } from "lucide-react";

const FoodFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    { icon: Wheat, label: "Farm", color: "text-green-500" },
    { icon: Apple, label: "Restaurant", color: "text-red-500" },
    { icon: Truck, label: "Transport", color: "text-blue-500" },
    { icon: Users, label: "Community", color: "text-purple-500" },
    { icon: Heart, label: "Impact", color: "text-pink-500" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section className="py-16 px-6 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          The Zinova Food Flow 🌱
        </h2>
        
        <div className="relative">
          {/* Flow line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 transform -translate-y-1/2 rounded-full"></div>
          
          {/* Flow steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;
              
              return (
                <div key={index} className="flex flex-col items-center z-10">
                  <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-500
                    ${isActive ? 'bg-white shadow-lg scale-110 ring-4 ring-accent' : ''}
                    ${isCompleted ? 'bg-white shadow-md' : 'bg-white/80'}
                  `}>
                    <Icon className={`w-8 h-8 ${step.color} ${isActive ? 'animate-pulse' : ''}`} />
                  </div>
                  <span className={`
                    text-sm font-medium text-center px-2 py-1 rounded-full
                    ${isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}
                  `}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how surplus food transforms from farm to table to community impact through our innovative platform
          </p>
        </div>
      </div>
    </section>
  );
};

export default FoodFlow;