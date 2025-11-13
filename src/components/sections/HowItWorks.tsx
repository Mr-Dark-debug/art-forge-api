import { FileImage, Terminal, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: FileImage,
    title: "Pick Your Model",
    description: "Choose from 80+ available models: Stable Diffusion, SDXL, Kandinsky, and more.",
    number: "01"
  },
  {
    icon: Terminal,
    title: "Send Your Prompt",
    description: "Use our OpenAI-compatible API to send your image generation request with a simple API call.",
    number: "02"
  },
  {
    icon: CheckCircle,
    title: "Get Your Image",
    description: "Receive high-quality images in seconds—ready to use anywhere in your application.",
    number: "03"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Three simple steps to integrate AI image generation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative animate-slide-up"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {/* Connector Line (hidden on mobile, shown on md+) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-accent -z-10" />
              )}

              <div className="flex flex-col items-center text-center space-y-4">
                {/* Step Number */}
                <div className="text-6xl font-bold text-primary/20">{step.number}</div>
                
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent p-3 glow-primary">
                  <step.icon className="w-full h-full text-background" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground max-w-xs">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
