import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingFeatures = [
  "No subscription required",
  "No hidden fees or minimums",
  "Scalable usage",
  "80+ models included",
  "OpenAI-compatible API",
  "24/7 support"
];

export const Pricing = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Pricing That <span className="text-gradient">Scales With You</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Simple, transparent pricing—no subscriptions, no surprises
          </p>
        </div>

        <Card className="p-8 md:p-12 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-primary/20 card-elevated">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
              Pay-As-You-Go
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-bold">
                <span className="text-gradient">From $0.001</span>
              </div>
              <p className="text-xl text-muted-foreground">per image</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {pricingFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>

          <Button variant="hero" size="xl" className="w-full">
            Get Started Free
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-4">
            No credit card required • Start generating immediately
          </p>
        </Card>
      </div>
    </section>
  );
};
