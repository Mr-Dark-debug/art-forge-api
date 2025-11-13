import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import lightBg from "@/assets/light-bg.png";
import darkBg from "@/assets/dark-bg.png";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { UpgradeBanner } from "@/components/ui/upgrade-banner";
import { Key } from "lucide-react";
import { useState, useEffect } from "react";

export const Hero = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial theme
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    
    // Watch for theme changes
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${isDarkMode ? darkBg : lightBg})`
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background z-0" />

      {/* Content */}
      <div className="container relative z-10 px-4 py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
          {/* Upgrade Banner */}
          <div className="flex justify-center">
            <UpgradeBanner 
              buttonText="Upgrade to Pro" 
              description="and use the premium models" 
              onClick={() => console.log("Upgrade clicked")}
            />
          </div>
          
          {/* Main Headline - Two Lines */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight inter-bold">
              All Your Favorite AI Art Generators
            </h1>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight inter-bold">
              One Unified API
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground inter-semibold">
            Access 80+ AI image generation models, all through an OpenAI-compatible API
          </p>

          {/* Input */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
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

          {/* CTA Buttons */}
          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <ButtonColorful label="Get Started" />
            <a 
              href="https://imagerouter.io/api-keys" 
              className="inline-flex h-10 items-center justify-center rounded-md px-6 py-2 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-[#95d63f] text-[#95d63f] hover:bg-[#95d63f] hover:text-black dark:hover:text-white"
            >
              <Key className="w-4 h-4 mr-2" />
              Get API Key
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};