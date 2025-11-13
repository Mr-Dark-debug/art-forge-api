import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
  companyName: string;
  width?: number;
  height?: number;
};

type LogoCloudSectionProps = {
  logos: Logo[];
};

export function LogoCloudSection({ logos }: LogoCloudSectionProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto">
        <h2 className="mb-8 text-center font-medium text-foreground text-2xl tracking-tight md:text-4xl">
          <span className="text-muted-foreground">The</span>
          <span className="font-bold text-green-500 dark:text-purple-500"> best </span>
          <span className="text-muted-foreground">are already here.</span>
        </h2>
        <div className="mx-auto my-6 h-px max-w-sm bg-border [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
        <LogoCloud logos={logos} className="py-12" />
        <div className="mt-6 h-px bg-border [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
      </div>
    </section>
  );
}