import { Layers, Zap, Shield, DollarSign, Code, Headphones } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Layers,
    title: "80+ Image Models",
    description: "All the style and quality you need in one place. Access Stable Diffusion, SDXL, Kandinsky, and more.",
    gradient: "from-primary to-primary-glow"
  },
  {
    icon: Code,
    title: "OpenAI-Compatible API",
    description: "Swap and scale with zero code changes. Drop-in replacement for your existing OpenAI integration.",
    gradient: "from-cyan to-primary"
  },
  {
    icon: DollarSign,
    title: "No Subscription",
    description: "Pay-as-you-go model gives you total flexibility. Start from $0.001 per image with no minimums.",
    gradient: "from-accent to-primary"
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    description: "Cloud-hosted infrastructure delivers instant results with 98% uptime guarantee.",
    gradient: "from-primary to-accent"
  },
  {
    icon: Shield,
    title: "Easy Integration",
    description: "Works seamlessly with Python, n8n, Zapier, and more. Get started in minutes.",
    gradient: "from-cyan to-accent"
  },
  {
    icon: Headphones,
    title: "Lightning Support",
    description: "24/7 live support and comprehensive documentation to help you succeed.",
    gradient: "from-primary-glow to-cyan"
  }
];

export const Features = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why <span className="text-gradient">ImageRouter</span>?
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to integrate AI image generation into your applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group hover:card-elevated animate-slide-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} p-2.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-full h-full text-background" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
