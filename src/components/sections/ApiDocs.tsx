import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const codeExample = `import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://api.imagerouter.io/v1',
  apiKey: process.env.IMAGEROUTER_API_KEY,
});

const response = await client.images.generate({
  model: 'stable-diffusion-xl',
  prompt: 'A serene landscape with mountains',
  n: 1,
  size: '1024x1024',
});

console.log(response.data[0].url);`;

export const ApiDocs = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <Badge variant="outline" className="border-cyan text-cyan">
            OpenAI-Compatible
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            Built for <span className="text-gradient">Developers</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Drop-in replacement for OpenAI's image API with extended functionality
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Code Example */}
          <Card className="p-6 bg-secondary/50 backdrop-blur-sm border-border overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-cyan" />
                <span className="font-mono text-sm text-muted-foreground">example.ts</span>
              </div>
              <Button variant="ghost" size="sm">
                Copy
              </Button>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code className="text-foreground/80 font-mono">{codeExample}</code>
            </pre>
          </Card>

          {/* Features List */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <Code2 className="w-5 h-5 text-background" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">OpenAPI Specification</h3>
                  <p className="text-muted-foreground">
                    Full OpenAPI spec with detailed documentation for every endpoint
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan to-primary flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-background" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Quick Start Guides</h3>
                  <p className="text-muted-foreground">
                    Step-by-step tutorials for Python, Node.js, and popular no-code tools
                  </p>
                </div>
              </div>
            </div>

            <Button variant="hero" size="lg" className="w-full md:w-auto">
              <BookOpen className="w-5 h-5" />
              Explore Full Documentation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
