"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const models = [
  {
    id: "hailuo-2.3-fast",
    name: "Hailuo 2.3 Fast",
    provider: "minimax",
    addedDate: "2024-11-10T08:00:00Z",
    daysAgo: 3,
    previewMedia: {
      type: "image",
      url: "https://images.unsplash.com/photo-1718312527921-2246714397b2?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    id: "dall-e-3",
    name: "DALL-E 3",
    provider: "OpenAI",
    addedDate: "2024-11-08T08:00:00Z",
    daysAgo: 5,
    previewMedia: {
      type: "image",
      url: "https://images.unsplash.com/photo-1718123282434-8b65b1288f72?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    id: "stable-diffusion-3",
    name: "Stable Diffusion 3",
    provider: "Stability AI",
    addedDate: "2024-11-05T08:00:00Z",
    daysAgo: 8,
    previewMedia: {
      type: "image",
      url: "https://images.unsplash.com/photo-1717789218559-6e0b0735a2d6?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
    {
    id: "imagen-2",
    name: "Imagen 2",
    provider: "Google",
    addedDate: "2024-11-02T08:00:00Z",
    daysAgo: 11,
    previewMedia: {
      type: "image",
      url: "https://images.unsplash.com/photo-1717789218559-6e0b0735a2d6?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
];

export function NewModels() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
              Freshly Added Models
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Discover the newest AI models added to our platform. Start
              generating with cutting-edge capabilities today.
            </p>
          </div>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {models.map((model, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardHeader>
                        <div className="relative">
                          <img
                            src={model.previewMedia.url}
                            alt={model.name}
                            className="rounded-lg"
                          />
                          <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            NEW
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardTitle>{model.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          by {model.provider}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Added {model.daysAgo} days ago
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Try Now</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
