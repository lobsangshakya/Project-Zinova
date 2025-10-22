import { Heart, Building, MapPin, Package } from "lucide-react";

const stats = [
  { 
    value: "50K+", 
    label: "Meals Saved 🍽️",
    icon: Heart
  },
  { 
    value: "25+", 
    label: "Partner Organizations 🤝",
    icon: Building
  },
  { 
    value: "15", 
    label: "Cities Covered 🌆",
    icon: MapPin
  },
  { 
    value: "100T", 
    label: "Food Redistributed 📦",
    icon: Package
  }
];

const Impact = () => {
  return (
    <section className="py-20 px-6 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Our Impact 🌟
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Making a real difference in communities across the region 🌍
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center space-y-2 animate-fade-in bg-primary-foreground/10 p-6 rounded-xl backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center">
                <stat.icon className="h-8 w-8 text-accent" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-accent">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-primary-foreground/90">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;