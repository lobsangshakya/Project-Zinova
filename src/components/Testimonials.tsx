import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Restaurant Owner",
    content: "Zinova helped us reduce food waste by 60% while making a positive impact in our community. Their platform is incredibly easy to use!",
    avatar: "SJ"
  },
  {
    name: "Michael Chen",
    role: "NGO Director",
    content: "The real-time tracking and transparency features have transformed how we distribute food to those in need. Truly innovative!",
    avatar: "MC"
  },
  {
    name: "Emma Rodriguez",
    role: "Local Farmer",
    content: "I love knowing that my surplus produce goes to good use instead of the landfill. Zinova connects me with organizations that care.",
    avatar: "ER"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Community Voices 🗣️
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from those who are making a difference with Zinova
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start mb-4">
                <Quote className="h-6 w-6 text-accent flex-shrink-0 mr-2" />
                <p className="text-muted-foreground italic">
                  "{testimonial.content}"
                </p>
              </div>
              <div className="flex items-center mt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <span className="font-bold text-primary">{testimonial.avatar}</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;