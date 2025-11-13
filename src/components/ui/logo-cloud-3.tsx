import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
  companyName: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,black,transparent)]",
        className
      )}
    >
      <InfiniteSlider gap={42} reverse speed={80} speedOnHover={25}>
        {logos.map((logo) => (
          <div key={`logo-${logo.alt}`} className="flex items-center mx-4">
            <img
              alt={logo.alt}
              className="pointer-events-none h-10 select-none md:h-12 dark:brightness-0 dark:invert"
              height={logo.height || "auto"}
              loading="lazy"
              src={logo.src}
              width={logo.width || "auto"}
            />
            <span className="text-base md:text-lg ml-4 font-medium text-foreground">
              {logo.companyName}
            </span>
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}