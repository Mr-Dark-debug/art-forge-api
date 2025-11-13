import { Header } from "@/components/ui/header-2";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Case } from "@/components/ui/cases-with-infinite-scroll";
import { NewModels } from "@/components/sections/NewModels";
import { Stats } from "@/components/sections/Stats";
import { LogoCloud } from "@/components/ui/logo-cloud-2";
import { Demo } from "@/components/sections/Demo";
import { ApiDocs } from "@/components/sections/ApiDocs";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/ui/footer-section";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <LogoCloud />
      <Case />
      <NewModels />
      <HowItWorks />
      <Features />
      <Demo />
      <ApiDocs />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
};

export default Index;
