import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import PrismaticBurst from "../PrismaticBurst";
import heroImage1 from "@/assets/hero-ai-image-1.jpg";
import heroImage2 from "@/assets/hero-ai-image-2.jpg";
import heroImage3 from "@/assets/hero-ai-image-3.jpg";
import { useState, useEffect } from "react";

const heroImages = [heroImage1, heroImage2, heroImage3];

export const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* PrismaticBurst Background */}
      <div className="absolute inset-0 z-0">
        <PrismaticBurst
          animationType="rotate3d"
          intensity={1.5}
          speed={0.2}
          distort={0.5}
          rayCount={12}
          mixBlendMode="lighten"
          colors={['#a855f7', '#ec4899', '#06b6d4']}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background z-0" />

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight amarante-regular">
            All Your Favorite AI Art Generators, One Unified API
          </h1>

          {/* Input */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <PlaceholdersAndVanishInput
              placeholders={[
                "a cat sitting on a couch",
                "a dog playing in the park",
                "a bird flying in the sky",
              ]}
              onChange={(e) => console.log(e.target.value)}
              onSubmit={(e) => e.preventDefault()}
            />
          </div>

          {/* Image Showcase */}
          <div className="pt-12">
            <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden card-elevated">
              <div className="aspect-video relative">
                {heroImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`AI Generated Example ${idx + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
                <p className="text-sm text-muted-foreground">
                  Real examples generated with ImageRouter.io
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-gradient">80+</div>
              <div className="text-sm text-muted-foreground">AI Models</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-gradient">100K+</div>
              <div className="text-sm text-muted-foreground">Images Generated</div>
            </div>
            <div className="space-y-2 col-span-2 md:col-span-1">
              <div className="text-4xl font-bold text-gradient">98%</div>
              <div className="text-sm text-muted-foreground">Uptime SLA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
