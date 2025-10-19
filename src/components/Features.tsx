import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Shield, Map, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Matching",
    description: "Smart algorithms connect surplus food with communities in need instantly and efficiently."
  },
  {
    icon: Shield,
    title: "Blockchain Transparency",
    description: "Complete traceability and trust through immutable records of every transaction."
  },
  {
    icon: Map,
    title: "Azure Maps Integration",
    description: "Optimized logistics and routing to ensure fast, efficient food distribution."
  },
  {
    icon: BarChart3,
    title: "Power BI Dashboards",
    description: "Real-time analytics and insights to measure impact and optimize operations."
  }
];

const Features = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Powered by Innovation
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Advanced technology working together to create sustainable impact
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
                </div>
                <CardTitle className="text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
