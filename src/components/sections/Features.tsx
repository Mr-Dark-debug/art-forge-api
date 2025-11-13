import { Card } from "@/components/ui/card";

const features = [
  {
    title: "80+ Image Models",
    description: "All the style and quality you need in one place. Access Stable Diffusion, SDXL, Kandinsky, and more."
  },
  {
    title: "OpenAI-Compatible API",
    description: "Swap and scale with zero code changes. Drop-in replacement for your existing OpenAI integration."
  },
  {
    title: "No Subscription",
    description: "Pay-as-you-go model gives you total flexibility. Start from $0.001 per image with no minimums."
  },
  {
    title: "Fast & Reliable",
    description: "Cloud-hosted infrastructure delivers instant results with 98% uptime guarantee."
  },
  {
    title: "Easy Integration",
    description: "Works seamlessly with Python, n8n, Zapier, and more. Get started in minutes."
  },
  {
    title: "Lightning Support",
    description: "24/7 live support and comprehensive documentation to help you succeed."
  }
];

export const Features = () => {
  return (
    <section className="py-16 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why <span className="text-gradient">ImageRouter</span>?
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to integrate AI image generation into your applications
          </p>
        </div>

        {/* Fade effect on both sides */}
        <div className="relative max-w-7xl mx-auto">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
          
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-4 px-4 -mx-4 scrollbar-hide">
            {features.map((feature, idx) => (
              <Card
                key={idx}
                variant="plus"
                className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group hover:card-elevated animate-slide-up min-w-[300px]"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
