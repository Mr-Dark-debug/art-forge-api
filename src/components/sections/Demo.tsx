import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useState } from "react";

const models = [
  "Stable Diffusion XL",
  "Stable Diffusion 2.1",
  "Kandinsky 2.2",
  "DALL-E Style",
  "Anime Diffusion"
];

export const Demo = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState(models[0]);

  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Try It <span className="text-gradient">Instantly</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Type your prompt, select a model, and see real results in seconds—no login required
          </p>
        </div>

        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border card-elevated">
          <div className="space-y-6">
            {/* Prompt Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Prompt</label>
              <Input
                placeholder="A serene landscape with mountains at sunset..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-background/50 border-border text-lg py-6"
              />
            </div>

            {/* Model Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Model</label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="bg-background/50 border-border py-6">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Generate Button */}
            <Button variant="hero" size="xl" className="w-full group">
              <Sparkles className="w-5 h-5 animate-glow-pulse" />
              Generate Image
              <Sparkles className="w-5 h-5 animate-glow-pulse" />
            </Button>

            {/* Demo Notice */}
            <p className="text-sm text-muted-foreground text-center">
              This is a live demo. Click generate to see ImageRouter.io in action.
            </p>
          </div>
        </Card>

        {/* Demo Output Placeholder */}
        <div className="mt-8 p-12 rounded-2xl bg-muted/30 border-2 border-dashed border-border flex items-center justify-center">
          <p className="text-muted-foreground">Generated image will appear here</p>
        </div>
      </div>
    </section>
  );
};
