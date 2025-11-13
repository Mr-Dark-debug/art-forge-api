'use client';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Sparkles } from "lucide-react";
import { AnimatedThemeToggler } from './animated-theme-toggler';

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

	const links = [
    { label: "Imagine", href: "https://imagerouter.io/imagine", icon: <Sparkles className="w-4 h-4 mr-2" /> },
    {
      label: "Tools",
      href: "#",
      dropdown: [
        { label: "Background Removal", href: "https://imagerouter.io/tools/background-removal" },
        { label: "Foreground Removal", href: "https://imagerouter.io/tools/erase-foreground" },
        { label: "Background Blur", href: "https://imagerouter.io/tools/background-blur" },
        { label: "SVG Vector Generation", href: "https://imagerouter.io/tools/vector-generation" },
        { label: "Open WebUI Plugin", href: "https://docs.imagerouter.io/integrations/open-webui-plugin" },
        { label: "n8n Integration", href: "https://docs.imagerouter.io/integrations/n8n-integration" },
        { label: "Zapier Integration", href: "https://docs.imagerouter.io/integrations/zapier-integration" },
      ],
    },
    { label: "Models", href: "https://imagerouter.io/models" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "https://docs.imagerouter.io/" },
  ];

	React.useEffect(() => {
		if (open) {
			// Disable scroll
			document.body.style.overflow = 'hidden';
		} else {
			// Re-enable scroll
			document.body.style.overflow = '';
		}

		// Cleanup when component unmounts (important for Next.js)
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className="fixed top-0 left-0 right-0 z-50 w-full border-b border-transparent bg-background/95 supports-[backdrop-filter]:bg-background/50 backdrop-blur-lg"
		>
			<nav
				className={cn(
					'flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out mx-auto max-w-5xl',
					{
						'md:px-2': scrolled,
					},
				)}
			>
				<a href="https://imagerouter.io/" className="font-bold text-lg">imagerouter.io</a>
				<div className="hidden items-center gap-2 md:flex">
					{links.map((link, i) =>
            link.dropdown ? (
              <DropdownMenu key={i}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    {link.icon && link.icon}
                    {link.label}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {link.dropdown.map((item, j) => (
                    <DropdownMenuItem key={j} asChild>
                      <a href={item.href}>{item.label}</a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <a key={i} className={buttonVariants({ variant: 'ghost' })} href={link.href}>
                {link.icon && link.icon}
                {link.label}
              </a>
            )
          )}
					<a href="https://imagerouter.io/login" className={buttonVariants({ variant: "outline", className: "w-full border-[#95d63f] text-black hover:bg-[#95d63f] hover:text-black dark:text-white dark:hover:text-white" })}>
						Sign In
					</a>
          <AnimatedThemeToggler />
				</div>
				<Button size="icon" variant="outline" onClick={() => setOpen(!open)} className="md:hidden">
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</nav>

			<div
				className={cn(
					'bg-background/90 fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y md:hidden',
					open ? 'block' : 'hidden',
				)}
			>
				<div
					data-slot={open ? 'open' : 'closed'}
					className={cn(
						'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
						'flex h-full w-full flex-col justify-between gap-y-2 p-4',
					)}
				>
					<div className="grid gap-y-2">
						{links.map((link) => (
							<a
								key={link.label}
								className={buttonVariants({
									variant: 'ghost',
									className: 'justify-start',
								})}
								href={link.href}
							>
                {link.icon && link.icon}
								{link.label}
							</a>
						))}
					</div>
					<div className="flex flex-col gap-2">
						<a href="https://imagerouter.io/login" className={buttonVariants({ variant: "outline", className: "w-full border-[#95d63f] text-black hover:bg-[#95d63f] hover:text-black dark:text-white dark:hover:text-white" })}>
							Sign In
						</a>
					</div>
				</div>
			</div>
		</header>
	);
}