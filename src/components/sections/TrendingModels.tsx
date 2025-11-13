"use client";

import { Card, CardContent } from "@/components/ui/card";
// Import brand SVGs
import bytedanceLogo from "@/assets/brand_svgs/bytedance-color.svg";
import fluxLogo from "@/assets/brand_svgs/flux.svg";
import openaiLogo from "@/assets/brand_svgs/openai.svg";
import stabilityLogo from "@/assets/brand_svgs/stability-color.svg";
import googleLogo from "@/assets/brand_svgs/vertexai-color.svg"; // Using vertexai for Google
import qwenLogo from "@/assets/brand_svgs/metaai-color.svg"; // Using metaai for Qwen as placeholder
import hiddreamLogo from "@/assets/brand_svgs/recraft.svg"; // Using recraft for HiDream as placeholder
import rundiffusionLogo from "@/assets/brand_svgs/recraft.svg"; // Using recraft for run-diffusion as placeholder

const trendingModels = [
  {
    id: "gemini-2.5-flash",
    name: "gemini-2.5-flash",
    provider: "google",
    imageCount: "5.29K",
    rank: 1,
    logo: googleLogo
  },
  {
    id: "FLUX-1-schnell:free",
    name: "FLUX-1-schnell:free",
    provider: "black-forest-labs",
    imageCount: "4.78K",
    rank: 2,
    logo: fluxLogo
  },
  {
    id: "qwen-image",
    name: "qwen-image",
    provider: "qwen",
    imageCount: "1.59K",
    rank: 3,
    logo: null // No logo for Qwen
  },
  {
    id: "seedream-4",
    name: "seedream-4",
    provider: "bytedance",
    imageCount: "1.01K",
    rank: 4,
    logo: bytedanceLogo
  },
  {
    id: "FLUX-1-schnell",
    name: "FLUX-1-schnell",
    provider: "black-forest-labs",
    imageCount: "992",
    rank: 5,
    logo: fluxLogo
  },
  {
    id: "sdxl-turbo:free",
    name: "sdxl-turbo:free",
    provider: "stabilityai",
    imageCount: "740",
    rank: 6,
    logo: stabilityLogo
  },
  {
    id: "gpt-image-1",
    name: "gpt-image-1",
    provider: "openai",
    imageCount: "390",
    rank: 7,
    logo: openaiLogo
  },
  {
    id: "qwen-image-edit-plus",
    name: "qwen-image-edit-plus",
    provider: "qwen",
    imageCount: "326",
    rank: 8,
    logo: null // No logo for Qwen
  },
  {
    id: "HiDream-I1-Full:free",
    name: "HiDream-I1-Full:free",
    provider: "HiDream-ai",
    imageCount: "305",
    rank: 9,
    logo: hiddreamLogo
  },
  {
    id: "Juggernaut-Pro-Flux",
    name: "Juggernaut-Pro-Flux",
    provider: "run-diffusion",
    imageCount: "215",
    rank: 10,
    logo: rundiffusionLogo
  },
];

export function TrendingModels() {
  // Function to get medal color and icon based on rank
  const getMedalStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
          textColor: "text-yellow-800 dark:text-yellow-200",
          borderColor: "border-yellow-300 dark:border-yellow-700",
          label: "Gold"
        };
      case 2:
        return {
          bgColor: "bg-gray-100 dark:bg-gray-700/30",
          textColor: "text-gray-800 dark:text-gray-200",
          borderColor: "border-gray-300 dark:border-gray-600",
          label: "Silver"
        };
      case 3:
        return {
          bgColor: "bg-amber-100 dark:bg-amber-900/30",
          textColor: "text-amber-800 dark:text-amber-200",
          borderColor: "border-amber-300 dark:border-amber-700",
          label: "Bronze"
        };
      default:
        return {
          bgColor: "bg-primary/10",
          textColor: "text-primary",
          borderColor: "border-border",
          label: ""
        };
    }
  };

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trending Models</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            The most popular models on the platform in the last 7 days.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {trendingModels.map((model) => {
            const medalStyle = getMedalStyle(model.rank);
            return (
              <Card 
                key={model.id} 
                className={`overflow-hidden hover:shadow-lg transition-shadow bg-card/80 backdrop-blur-sm border ${medalStyle.borderColor} ${
                  model.rank <= 3 ? "ring-2 ring-offset-2 ring-offset-background" : ""
                } ${
                  model.rank === 1 
                    ? "ring-yellow-400 dark:ring-yellow-600" 
                    : model.rank === 2 
                      ? "ring-gray-300 dark:ring-gray-500" 
                      : model.rank === 3 
                        ? "ring-amber-400 dark:ring-amber-600" 
                        : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-lg font-bold px-2 py-1 rounded-full ${medalStyle.bgColor} ${medalStyle.textColor}`}>
                          #{model.rank}
                        </span>
                        {model.rank <= 3 && (
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                            {medalStyle.label}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {model.logo ? (
                          <img 
                            src={model.logo} 
                            alt={`${model.provider} logo`} 
                            className="h-8 md:h-10 w-auto object-contain dark:brightness-0 dark:invert"
                          />
                        ) : (
                          <div className="h-8 md:h-10 w-10 flex items-center justify-center bg-muted rounded-lg">
                            <span className="text-xs font-bold text-muted-foreground">No Logo</span>
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg mb-3 text-foreground">{model.name}</h3>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-medium text-muted-foreground">{model.imageCount} images</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}