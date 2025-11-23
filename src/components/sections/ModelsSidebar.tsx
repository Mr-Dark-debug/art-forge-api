

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink, useSidebar } from "@/components/ui/sidebar";
import {
    LayoutDashboard,
    UserCog,
    Settings,
    LogOut,
    Filter,
    Search,
    Check,
    ChevronDown,
    ChevronRight,
    Zap,
    DollarSign,
    Trophy,
    Layers,
    Image as ImageIcon,
    Video,
    X
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";



interface ModelsSidebarProps {
    filters: {
        modelType: string[];
        providers: string[];
        priceRange: number[];
        arenaScore: number[];
        features: string[];
        speed: string[];
        freeOnly: boolean;
    };
    onFilterChange: (filters: any) => void;
    uniqueProviders: string[];
    toggleFilter: (filterType: string, value: string) => void;
    activeFilterCount: number;
    resetFilters: () => void;
    providerLogos: Record<string, string>;
}

export function ModelsSidebar({
    filters,
    onFilterChange,
    uniqueProviders,
    toggleFilter,
    activeFilterCount,
    resetFilters,
    providerLogos
}: ModelsSidebarProps) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                "h-[calc(100vh-4rem)]"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}

                        <div className="mt-8 flex flex-col gap-2">
                            {/* Filter Header - Only visible when open */}
                            {open && (
                                <div className="flex items-center justify-between px-2 mb-4">
                                    <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                                        FILTERS {activeFilterCount > 0 && `(${activeFilterCount})`}
                                    </h3>
                                    {activeFilterCount > 0 && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                resetFilters();
                                            }}
                                            className="h-6 px-2 text-xs text-[#95d63f] hover:text-[#95d63f] hover:bg-[#95d63f]/10"
                                        >
                                            Reset
                                        </Button>
                                    )}
                                </div>
                            )}

                            {/* Filter Content */}
                            <div className={cn("flex flex-col gap-4", !open && "hidden")}>
                                <FilterContent
                                    filters={filters}
                                    onFilterChange={onFilterChange}
                                    uniqueProviders={uniqueProviders}
                                    toggleFilter={toggleFilter}
                                    providerLogos={providerLogos}
                                />
                            </div>

                            {/* Collapsed State Icons */}
                            {!open && (
                                <div className="flex flex-col items-center gap-4 mt-4">
                                    <Filter className="h-5 w-5 text-neutral-500" />
                                    {activeFilterCount > 0 && (
                                        <Badge className="h-5 w-5 p-0 flex items-center justify-center bg-[#95d63f] text-black rounded-full text-[10px]">
                                            {activeFilterCount}
                                        </Badge>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* User Profile / Footer */}
                    <div>
                        <SidebarLink
                            link={{
                                label: "Prashant",
                                href: "#",
                                icon: (
                                    <div className="h-7 w-7 rounded-full bg-gradient-to-r from-[#95d63f] to-emerald-500 flex items-center justify-center text-black font-bold text-xs">
                                        P
                                    </div>
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
        </div>
    );
}

const Logo = () => {
    return (
        <Link
            to="/"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-[#95d63f] rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                Art Forge
            </motion.span>
        </Link>
    );
};

const LogoIcon = () => {
    return (
        <Link
            to="/"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-[#95d63f] rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        </Link>
    );
};

function FilterContent({
    filters,
    onFilterChange,
    uniqueProviders,
    toggleFilter,
    providerLogos
}: {
    filters: any;
    onFilterChange: (filters: any) => void;
    uniqueProviders: string[];
    toggleFilter: (filterType: string, value: string) => void;
    providerLogos: Record<string, string>;
}) {
    const [providerSearch, setProviderSearch] = useState("");

    const filteredProviders = uniqueProviders.filter(p =>
        p.toLowerCase().includes(providerSearch.toLowerCase())
    );

    return (
        <Accordion type="multiple" defaultValue={["model-type", "providers"]} className="w-full px-2">
            {/* Model Type */}
            <AccordionItem value="model-type" className="border-none">
                <AccordionTrigger className="py-2 hover:no-underline hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md px-2">
                    <div className="flex items-center gap-2 text-sm">
                        <Layers className="h-4 w-4 text-[#95d63f]" />
                        <span>Model Type</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-2 pb-2">
                    <div className="space-y-2 pt-2">
                        {[
                            { id: "text-to-image", label: "Text to Image", icon: ImageIcon },
                            { id: "image-to-image", label: "Image to Image", icon: ImageIcon },
                            { id: "text-to-video", label: "Text to Video", icon: Video },
                            { id: "image-to-video", label: "Image to Video", icon: Video },
                        ].map((type) => (
                            <div key={type.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={type.id}
                                    checked={filters.modelType.includes(type.id)}
                                    onCheckedChange={() => toggleFilter("modelType", type.id)}
                                    className="data-[state=checked]:bg-[#95d63f] data-[state=checked]:text-black border-neutral-500"
                                />
                                <label
                                    htmlFor={type.id}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
                                >
                                    {type.label}
                                </label>
                            </div>
                        ))}

                        <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 mt-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="free-only"
                                    checked={filters.freeOnly}
                                    onCheckedChange={() => onFilterChange({ ...filters, freeOnly: !filters.freeOnly })}
                                    className="data-[state=checked]:bg-[#95d63f] data-[state=checked]:text-black border-neutral-500"
                                />
                                <label
                                    htmlFor="free-only"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-[#95d63f]"
                                >
                                    Free Models Only
                                </label>
                            </div>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>

            {/* Providers */}
            <AccordionItem value="providers" className="border-none">
                <AccordionTrigger className="py-2 hover:no-underline hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md px-2">
                    <div className="flex items-center gap-2 text-sm">
                        <Zap className="h-4 w-4 text-[#95d63f]" />
                        <span>Providers</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-2 pb-2">
                    <div className="space-y-2 pt-2">
                        <div className="relative mb-2">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                            <Input
                                placeholder="Search providers..."
                                className="h-8 pl-8 text-xs bg-transparent border-neutral-200 dark:border-neutral-700"
                                value={providerSearch}
                                onChange={(e) => setProviderSearch(e.target.value)}
                            />
                        </div>
                        <ScrollArea className="h-[150px] pr-2">
                            <div className="space-y-2">
                                {filteredProviders.map((provider) => (
                                    <div key={provider} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`provider-${provider}`}
                                            checked={filters.providers.includes(provider)}
                                            onCheckedChange={() => toggleFilter("providers", provider)}
                                            className="data-[state=checked]:bg-[#95d63f] data-[state=checked]:text-black border-neutral-500"
                                        />
                                        <label
                                            htmlFor={`provider-${provider}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2 truncate"
                                        >
                                            {providerLogos[provider] || providerLogos[provider.toLowerCase()] ? (
                                                <img
                                                    src={providerLogos[provider] || providerLogos[provider.toLowerCase()]}
                                                    alt={provider}
                                                    className="h-4 w-4 object-contain"
                                                />
                                            ) : (
                                                <div className="h-4 w-4 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
                                            )}
                                            <span className="truncate">{provider}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </AccordionContent>
            </AccordionItem>

            {/* Pricing */}
            <AccordionItem value="pricing" className="border-none">
                <AccordionTrigger className="py-2 hover:no-underline hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md px-2">
                    <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-[#95d63f]" />
                        <span>Pricing Range</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-2 pb-2">
                    <div className="space-y-4 pt-4 px-1">
                        <Slider
                            defaultValue={[0, 3.5]}
                            value={filters.priceRange}
                            max={3.5}
                            step={0.01}
                            onValueChange={(value) => onFilterChange({ ...filters, priceRange: value })}
                            className="py-2"
                        />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>${filters.priceRange[0].toFixed(2)}</span>
                            <span>${filters.priceRange[1].toFixed(2)}+</span>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>

            {/* Arena Score */}
            <AccordionItem value="arena-score" className="border-none">
                <AccordionTrigger className="py-2 hover:no-underline hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md px-2">
                    <div className="flex items-center gap-2 text-sm">
                        <Trophy className="h-4 w-4 text-[#95d63f]" />
                        <span>Arena Score</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-2 pb-2">
                    <div className="space-y-4 pt-4 px-1">
                        <Slider
                            defaultValue={[900, 1400]}
                            value={filters.arenaScore}
                            min={900}
                            max={1400}
                            step={10}
                            onValueChange={(value) => onFilterChange({ ...filters, arenaScore: value })}
                            className="py-2"
                        />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{filters.arenaScore[0]}</span>
                            <span>{filters.arenaScore[1]}</span>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>

            {/* Features */}
            <AccordionItem value="features" className="border-none">
                <AccordionTrigger className="py-2 hover:no-underline hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md px-2">
                    <div className="flex items-center gap-2 text-sm">
                        <Settings className="h-4 w-4 text-[#95d63f]" />
                        <span>Features</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-2 pb-2">
                    <div className="space-y-2 pt-2">
                        {[
                            { id: "edit", label: "Image Editing" },
                            { id: "mask", label: "Masking" },
                            { id: "quality", label: "Quality Control" },
                        ].map((feature) => (
                            <div key={feature.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={feature.id}
                                    checked={filters.features.includes(feature.id)}
                                    onCheckedChange={() => toggleFilter("features", feature.id)}
                                    className="data-[state=checked]:bg-[#95d63f] data-[state=checked]:text-black border-neutral-500"
                                />
                                <label
                                    htmlFor={feature.id}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                    {feature.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
