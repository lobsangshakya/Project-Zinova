import { useState, useEffect } from "react";
import { Globe, TrendingUp, Users, Leaf, Package } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const GlobalImpact = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Global impact statistics (real-time simulated data)
  const globalStats = [
    {
      icon: Globe,
      title: "Global Food Waste",
      value: 1300000000, // 1.3 billion tons
      suffix: " tons",
      description: "of food wasted annually worldwide"
    },
    {
      icon: Users,
      title: "People Fed",
      value: 820000000, // 820 million people
      suffix: "",
      description: "suffer from hunger globally"
    },
    {
      icon: Leaf,
      title: "CO2 Emissions",
      value: 3300000000, // 3.3 billion tons
      suffix: " tons",
      description: "of greenhouse gases from food waste"
    },
    {
      icon: Package,
      title: "Water Wasted",
      value: 250000000000, // 250 billion cubic meters
      suffix: " m³",
      description: "of water used to grow wasted food"
    }
  ];

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-background to-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <div className="flex justify-center">
            <Globe className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            The Global Challenge 🌍
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Understanding the scale of food waste helps us appreciate the impact of solutions like Zinova
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {globalStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className={`
                  bg-card border border-border rounded-xl p-6 shadow-sm
                  transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 mr-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">{stat.title}</h3>
                </div>
                
                <div className="mb-2">
                  <span className="text-3xl font-bold text-primary">
                    <AnimatedCounter 
                      target={stat.value} 
                      suffix={stat.suffix} 
                      duration={2500} 
                    />
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <TrendingUp className="h-12 w-12 mx-auto mb-4 text-accent" />
          <h3 className="text-2xl font-bold mb-4">
            Every Action Counts 🤝
          </h3>
          <p className="max-w-2xl mx-auto text-primary-foreground/90 mb-6">
            While the global challenge is immense, collective action through platforms like Zinova 
            can create meaningful change. Together, we can turn these staggering numbers into 
            opportunities for positive impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-primary-foreground/10 px-4 py-2 rounded-full">
              <span className="font-bold">1 kg saved = 2.3 kg CO2 prevented</span>
            </div>
            <div className="bg-primary-foreground/10 px-4 py-2 rounded-full">
              <span className="font-bold">1 meal shared = 1 person fed</span>
            </div>
            <div className="bg-primary-foreground/10 px-4 py-2 rounded-full">
              <span className="font-bold">1 partner = 100+ meals/year</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalImpact;