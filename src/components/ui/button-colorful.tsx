import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export function ButtonColorful({
  className,
  label = "Explore Components",
  ...props
}: ButtonColorfulProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "group relative w-full overflow-hidden rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 text-lg font-bold text-white md:w-max",
        className,
      )}
      {...props}
    >
      <span className="ease-in-out-circ absolute -right-20 -top-20 -z-10 h-40 w-40 rounded-full bg-background/20 opacity-0 transition-all duration-300 group-hover:right-12 group-hover:top-12 group-hover:opacity-100 group-active:right-20 group-active:top-20" />
      <span className="ease-in-out-circ absolute -right-20 -top-20 -z-10 h-32 w-32 rounded-full bg-background/20 opacity-0 transition-all duration-300 group-hover:right-2 group-hover:top-2 group-hover:opacity-100 group-active:right-12 group-active:top-12" />
      <span className="ease-in-out-circ absolute -right-20 -top-20 -z-10 h-24 w-24 rounded-full bg-background/20 opacity-0 transition-all duration-300 group-hover:right-5 group-hover:top-5 group-hover:opacity-100 group-active:right-20 group-active:top-20" />
      <span className="z-20 flex items-center justify-center gap-2">
        {label} <ArrowUpRight />
      </span>
    </Button>
  );
}
