import React from "react";
import { cn } from "@/lib/utils";

// Import brand SVGs
import bytedanceLogo from "@/assets/brand_svgs/bytedance-color.svg";
import dalleLogo from "@/assets/brand_svgs/dalle-color.svg";
import deepinfraLogo from "@/assets/brand_svgs/deepinfra-color.svg";
import fluxLogo from "@/assets/brand_svgs/flux.svg";
import grokLogo from "@/assets/brand_svgs/grok.svg";
import ideogramLogo from "@/assets/brand_svgs/ideogram.svg";
import klingLogo from "@/assets/brand_svgs/kling-color.svg";
import metaaiLogo from "@/assets/brand_svgs/metaai-color.svg";
import midjourneyLogo from "@/assets/brand_svgs/midjourney.svg";
import openaiLogo from "@/assets/brand_svgs/openai.svg";
import recraftLogo from "@/assets/brand_svgs/recraft.svg";
import replicateLogo from "@/assets/brand_svgs/replicate.svg";
import runwayLogo from "@/assets/brand_svgs/runway.svg";
import stabilityLogo from "@/assets/brand_svgs/stability-color.svg";
import vertexaiLogo from "@/assets/brand_svgs/vertexai-color.svg";

// Provider logos mapping
const providerLogos: Record<string, string> = {
  "bytedance": bytedanceLogo,
  "dalle": dalleLogo,
  "deepinfra": deepinfraLogo,
  "flux": fluxLogo,
  "grok": grokLogo,
  "ideogram": ideogramLogo,
  "kling": klingLogo,
  "meta": metaaiLogo,
  "metaai": metaaiLogo,
  "midjourney": midjourneyLogo,
  "openai": openaiLogo,
  "recraft": recraftLogo,
  "replicate": replicateLogo,
  "runway": runwayLogo,
  "stability": stabilityLogo,
  "stabilityai": stabilityLogo,
  "vertexai": vertexaiLogo,
  "google": vertexaiLogo,
  "blackforestlabs": fluxLogo,
  "black forest labs": fluxLogo,
};

export interface ProviderLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  provider: string;
}

export const ProviderLogo = React.forwardRef<HTMLImageElement, ProviderLogoProps>(
  ({ provider, className, ...props }, ref) => {
    const normalizedProvider = provider.toLowerCase().trim();
    const logoSrc = providerLogos[normalizedProvider] || providerLogos[provider] || "";
    
    if (!logoSrc) {
      // Fallback to a simple div with provider name initials if logo not found
      const initials = normalizedProvider
        .split(/[\s-]+/)
        .map(word => word.charAt(0))
        .join("")
        .toUpperCase()
        .substring(0, 2);
      
      return (
        <div 
          ref={ref as any}
          className={cn(
            "flex items-center justify-center bg-muted rounded text-xs font-medium",
            className
          )}
          {...props}
        >
          {initials || "?"}
        </div>
      );
    }

    return (
      <img
        ref={ref}
        src={logoSrc}
        alt={`${provider} logo`}
        className={cn("object-contain", className)}
        {...props}
      />
    );
  }
);

ProviderLogo.displayName = "ProviderLogo";