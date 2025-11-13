import { Header } from "@/components/ui/header-2";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Case } from "@/components/ui/cases-with-infinite-scroll";
import { LogoCloudSection } from "@/components/sections/LogoCloudSection";
import PricingSection1 from "@/components/ui/pricing-section-1";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/ui/footer-section";
import { DeveloperFriendly } from "@/components/sections/DeveloperFriendly";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { TrendingModels } from "@/components/sections/TrendingModels";

// Import local SVG files
import bytedanceLogo from "@/assets/brand_svgs/bytedance-color.svg";
import dalleLogo from "@/assets/brand_svgs/dalle-color.svg";
import fluxLogo from "@/assets/brand_svgs/flux.svg";
import ideogramLogo from "@/assets/brand_svgs/ideogram.svg";
import klingLogo from "@/assets/brand_svgs/kling-color.svg";
import metaaiLogo from "@/assets/brand_svgs/metaai-color.svg";
import midjourneyLogo from "@/assets/brand_svgs/midjourney.svg";
import openaiLogo from "@/assets/brand_svgs/openai.svg";
import recraftLogo from "@/assets/brand_svgs/recraft.svg";
import stabilityLogo from "@/assets/brand_svgs/stability-color.svg";
import vertexaiLogo from "@/assets/brand_svgs/vertexai-color.svg";

const logos = [
  {
    src: bytedanceLogo,
    alt: "Bytedance Logo",
    companyName: "Bytedance",
  },
  {
    src: dalleLogo,
    alt: "DALL-E Logo",
    companyName: "DALL-E",
  },
  {
    src: fluxLogo,
    alt: "Flux Logo",
    companyName: "Flux",
  },
  {
    src: ideogramLogo,
    alt: "Ideogram Logo",
    companyName: "Ideogram",
  },
  {
    src: klingLogo,
    alt: "Kling Logo",
    companyName: "Kling",
  },
  {
    src: metaaiLogo,
    alt: "Meta AI Logo",
    companyName: "Meta AI",
  },
  {
    src: midjourneyLogo,
    alt: "Midjourney Logo",
    companyName: "Midjourney",
  },
  {
    src: openaiLogo,
    alt: "OpenAI Logo",
    companyName: "OpenAI",
  },
  {
    src: recraftLogo,
    alt: "Recraft Logo",
    companyName: "Recraft",
  },
  {
    src: stabilityLogo,
    alt: "Stability AI Logo",
    companyName: "Stability AI",
  },
  {
    src: vertexaiLogo,
    alt: "Vertex AI Logo",
    companyName: "Vertex AI",
  },
];

const Index = () => {
  return (
    <main className="min-h-screen w-full">
      <Header />
      <Hero />
      <LogoCloudSection logos={logos} />
      <Case />
      <Features />
      <DeveloperFriendly />
      <StaggerTestimonials />
      <PricingSection1 />
      <TrendingModels />
      <FAQ />
      <Footer />
    </main>
  );
};

export default Index;