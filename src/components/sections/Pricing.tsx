import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Free Forever",
    description: "Perfect for testing and learning",
    price: "$0",
    period: "/month",
    features: [
      { text: "10 generations/day", included: true },
      { text: "No credit card required", included: true },
      { text: "Access to free models", included: true },
      { text: "Limited model selection", included: false },
      { text: "Captcha required", included: false },
      { text: "API access", included: false },
    ],
    cta: "Try Now – No Signup Required",
    popular: false,
    href: "#"
  },
  {
    name: "Pay-As-You-Go",
    description: "Scale from hobby to enterprise",
    price: "From $0.0002",
    period: "/image",
    features: [
      { text: "50 free generations/day", included: true },
      { text: "80+ models (image + video)", included: true },
      { text: "Full API access", included: true },
      { text: "No monthly fees", included: true },
      { text: "No minimum spend", included: true },
      { text: "Priority support", included: false },
    ],
    cta: "Get Started",
    popular: true,
    href: "#"
  },
  {
    name: "Enterprise",
    description: "Custom solutions for your needs",
    price: "Custom",
    period: "",
    features: [
      { text: "Volume discounts", included: true },
      { text: "Priority support", included: true },
      { text: "Custom integrations", included: true },
      { text: "99.9% SLA", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom models", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
    href: "#"
  }
];

export const Pricing = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pay only for what you generate. No subscriptions, no surprises.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.popular ? 'border-primary ring-2 ring-primary/20' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                  Most Popular
                </Badge>
              )}
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 mr-2" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground mr-2" />
                      )}
                      <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => window.location.href = plan.href}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="flex items-center gap-2" onClick={() => window.location.href = "#"}>
              <Zap className="w-5 h-5" />
              Start Building Free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};