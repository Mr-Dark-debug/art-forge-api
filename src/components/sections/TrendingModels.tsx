"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Sparkles, Star } from "lucide-react";

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
    name: "Gemini 2.5",
    provider: "google",
    imageCount: "5.29K",
    rank: 1,
    logo: googleLogo
  },
  {
    id: "FLUX-1-schnell:free",
    name: "Flux Schnell",
    provider: "black-forest-labs",
    imageCount: "4.78K",
    rank: 2,
    logo: fluxLogo
  },
  {
    id: "qwen-image",
    name: "Gwen Image",
    provider: "qwen",
    imageCount: "1.59K",
    rank: 3,
    logo: null // No logo for Qwen
  },
  {
    id: "seedream-4",
    name: "Seed Dream",
    provider: "bytedance",
    imageCount: "1.07K",
    rank: 4,
    logo: bytedanceLogo
  },
  {
    id: "FLUX-1-schnell",
    name: "Flux Schnell",
    provider: "black-forest-labs",
    imageCount: "892",
    rank: 5,
    logo: fluxLogo
  },
  {
    id: "sdxl-turbo:free",
    name: "SDXL Turbo",
    provider: "stabilityai",
    imageCount: "870",
    rank: 6,
    logo: stabilityLogo
  },
  {
    id: "gpt-image-1",
    name: "GPT Image",
    provider: "openai",
    imageCount: "751",
    rank: 7,
    logo: openaiLogo
  },
  {
    id: "qwen-image-edit-plus",
    name: "Gwen Edit",
    provider: "qwen",
    imageCount: "680",
    rank: 8,
    logo: null // No logo for Qwen
  },
];

export function TrendingModels() {
  // Split models into featured (top 3) and regular
  const featuredModels = trendingModels.slice(0, 3);
  const regularModels = trendingModels.slice(3);

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Trending Models
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the most popular AI models on our platform right now.
          </p>
        </div>

        {/* Featured Models - Top 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {featuredModels.map((model) => (
            <Card
              key={model.id}
              className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-card to-card/50"
            >
              <CardContent className="p-6">
                {/* Trending Badge */}
                <div className="flex items-center justify-between mb-4">
                  <Badge
                    className={`
                      px-3 py-1 text-xs font-bold uppercase tracking-wider
                      ${model.rank === 1
                        ? 'bg-yellow-500 text-black hover:bg-yellow-500'
                        : model.rank === 2
                          ? 'bg-gray-400 text-white hover:bg-gray-400'
                          : 'bg-orange-500 text-white hover:bg-orange-500'
                      }
                    `}
                  >
                    #{model.rank} Trending
                  </Badge>
                  {model.rank === 1 && (
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  )}
                </div>

                {/* Provider Logo */}
                <div className="mb-4 h-12 flex items-center">
                  {model.logo ? (
                    <img
                      src={model.logo}
                      alt={`${model.provider} logo`}
                      className="h-10 w-auto object-contain dark:brightness-0 dark:invert"
                    />
                  ) : (
                    <div className="h-10 w-10 flex items-center justify-center bg-muted rounded-lg">
                      <Sparkles className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Model Name */}
                <h3 className="font-bold text-xl mb-2 text-foreground group-hover:text-primary transition-colors">
                  {model.name}
                </h3>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    {model.imageCount} Images
                  </span>
                </div>

                {/* Explore Button */}
                <Button
                  className="w-full group/btn"
                  variant="outline"
                >
                  Explore
                  <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Regular Models Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {regularModels.map((model) => (
            <Card
              key={model.id}
              className="group overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-5">
                {/* Rank Badge */}
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">
                    #{model.rank}
                  </Badge>
                </div>

                {/* Provider Logo */}
                <div className="mb-3 h-8 flex items-center">
                  {model.logo ? (
                    <img
                      src={model.logo}
                      alt={`${model.provider} logo`}
                      className="h-6 w-auto object-contain dark:brightness-0 dark:invert"
                    />
                  ) : (
                    <div className="h-6 w-6 flex items-center justify-center bg-muted rounded">
                      <Sparkles className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Model Name */}
                <h4 className="font-semibold text-base mb-2 text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {model.name}
                </h4>

                {/* Stats */}
                <p className="text-xs text-muted-foreground mb-3">
                  {model.imageCount} images
                </p>

                {/* Explore Button */}
                <Button
                  size="sm"
                  className="w-full"
                  variant="ghost"
                >
                  Explore
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}