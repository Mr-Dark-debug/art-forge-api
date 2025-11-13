import { useState, useEffect, useMemo, useCallback } from "react";
import { Search, Grid, List, Filter, X, Copy, ChevronDown, Play, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { toast } from "@/components/ui/use-toast";
import { Header } from "@/components/ui/header-2";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

// Import brand SVGs
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

// Types
interface Provider {
  name: string;
  model_name: string;
  pricing: {
    type: string;
    value?: number;
    range?: [number, number];
  };
}

interface Example {
  image?: string;
  video?: string;
}

interface Model {
  id: string;
  name: string;
  providers: Provider[];
  arena_score: number;
  release_date: string;
  examples: Example[];
  output: "image" | "video";
  supported_params: string[];
  description: string;
  generation_count: string;
}

// Mock data - in a real implementation, this would come from the API
const mockModels: Model[] = [
  {
    id: "black-forest-labs/FLUX-1.1-pro",
    name: "FLUX-1.1-pro Ultra",
    providers: [
      {
        name: "Black Forest Labs",
        model_name: "black-forest-labs/FLUX-1.1-pro",
        pricing: {
          type: "fixed",
          value: 0.04
        }
      }
    ],
    arena_score: 1240,
    release_date: "2024-10-15",
    examples: [{ image: "/placeholder.svg" }],
    output: "image",
    supported_params: ["edit", "quality", "4K"],
    description: "Advanced flux model for professional use cases with exceptional detail and realism.",
    generation_count: "1.2K"
  },
  {
    id: "stabilityai/stable-diffusion-3",
    name: "Stable Diffusion 3",
    providers: [
      {
        name: "Stability AI",
        model_name: "stabilityai/stable-diffusion-3",
        pricing: {
          type: "fixed",
          value: 0.03
        }
      }
    ],
    arena_score: 1180,
    release_date: "2024-09-20",
    examples: [{ image: "/placeholder.svg" }],
    output: "image",
    supported_params: ["edit", "mask", "quality"],
    description: "Latest iteration of the popular Stable Diffusion model with improved prompt understanding.",
    generation_count: "2.5K"
  },
  {
    id: "openai/dall-e-3",
    name: "DALL-E 3",
    providers: [
      {
        name: "OpenAI",
        model_name: "openai/dall-e-3",
        pricing: {
          type: "fixed",
          value: 0.08
        }
      }
    ],
    arena_score: 1320,
    release_date: "2024-08-10",
    examples: [{ image: "/placeholder.svg" }],
    output: "image",
    supported_params: ["quality", "hd"],
    description: "OpenAI's most advanced image generation model with exceptional text understanding.",
    generation_count: "3.1K"
  },
  {
    id: "google/imagen-3",
    name: "Imagen 3",
    providers: [
      {
        name: "Google",
        model_name: "google/imagen-3",
        pricing: {
          type: "fixed",
          value: 0.05
        }
      }
    ],
    arena_score: 1280,
    release_date: "2024-11-01",
    examples: [{ image: "/placeholder.svg" }],
    output: "image",
    supported_params: ["edit", "4K"],
    description: "Google's latest image generation model with photorealistic capabilities.",
    generation_count: "980"
  },
  {
    id: "bytedance/sd3.5",
    name: "SD3.5 Large",
    providers: [
      {
        name: "ByteDance",
        model_name: "bytedance/sd3.5",
        pricing: {
          type: "fixed",
          value: 0.02
        }
      }
    ],
    arena_score: 1150,
    release_date: "2024-10-05",
    examples: [{ image: "/placeholder.svg" }],
    output: "image",
    supported_params: ["edit", "quality"],
    description: "ByteDance's efficient model with excellent performance at a competitive price.",
    generation_count: "1.8K"
  },
  {
    id: "minimax/video-1",
    name: "VideoGen Pro",
    providers: [
      {
        name: "Minimax",
        model_name: "minimax/video-1",
        pricing: {
          type: "fixed",
          value: 0.15
        }
      }
    ],
    arena_score: 1080,
    release_date: "2024-09-15",
    examples: [{ video: "/placeholder.svg" }],
    output: "video",
    supported_params: ["duration", "quality"],
    description: "High-quality video generation model with smooth motion and detail.",
    generation_count: "420"
  }
];

// Provider logos mapping
const providerLogos: Record<string, string> = {
  "Black Forest Labs": fluxLogo,
  "Stability AI": stabilityLogo,
  "OpenAI": openaiLogo,
  "Google": vertexaiLogo,
  "ByteDance": bytedanceLogo,
  "Minimax": "NA"
};

export default function Models() {
  // Helper function to get model price
  const getModelPrice = (model: Model): number => {
    const provider = model.providers[0];
    if (provider.pricing.type === "fixed") {
      return provider.pricing.value || 0;
    }
    return 0;
  };

  // Helper function to check if model is new (released within 30 days)
  const isNewModel = (releaseDate: string): boolean => {
    const release = new Date(releaseDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - release.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  // State
  const [models] = useState<Model[]>(mockModels);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("arena_score");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    modelType: [] as string[],
    providers: [] as string[],
    priceRange: [0, 3.5],
    arenaScore: [900, 1400],
    features: [] as string[],
    speed: [] as string[],
    freeOnly: false
  });
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedModels, setLoadedModels] = useState(12); // Initially load 12 models
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  // Toggle filter
  const toggleFilter = (filterType: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const current = Array.isArray(prev[filterType]) ? [...prev[filterType] as string[]] : [];
      const index = current.indexOf(value);
      
      if (index >= 0) {
        current.splice(index, 1);
      } else {
        current.push(value);
      }
      
      return {
        ...prev,
        [filterType]: current
      };
    });
  };

  // Filter and sort models
  const filteredAndSortedModels = useMemo(() => {
    let result = [...models];
    
    // Apply search filter
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      result = result.filter(model => 
        model.name.toLowerCase().includes(query) ||
        model.providers.some(p => p.name.toLowerCase().includes(query)) ||
        model.supported_params.some(param => param.toLowerCase().includes(query))
      );
    }
    
    // Apply model type filter
    if (filters.modelType.length > 0) {
      result = result.filter(model => {
        if (filters.modelType.includes("free") && getModelPrice(model) === 0) return true;
        if (filters.modelType.includes("text-to-image") && model.output === "image") return true;
        if (filters.modelType.includes("text-to-video") && model.output === "video") return true;
        return false;
      });
    }
    
    // Apply provider filter
    if (filters.providers.length > 0) {
      result = result.filter(model => 
        model.providers.some(provider => 
          filters.providers.includes(provider.name)
        )
      );
    }
    
    // Apply price range filter
    result = result.filter(model => {
      const price = getModelPrice(model);
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });
    
    // Apply arena score filter
    result = result.filter(model => 
      model.arena_score >= filters.arenaScore[0] && 
      model.arena_score <= filters.arenaScore[1]
    );
    
    // Apply features filter
    if (filters.features.length > 0) {
      result = result.filter(model => 
        filters.features.every(feature => 
          model.supported_params.includes(feature)
        )
      );
    }
    
    // Apply free only filter
    if (filters.freeOnly) {
      result = result.filter(model => getModelPrice(model) === 0);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "arena_score":
          return b.arena_score - a.arena_score;
        case "price_low":
          return getModelPrice(a) - getModelPrice(b);
        case "price_high":
          return getModelPrice(b) - getModelPrice(a);
        case "date":
          return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
        case "name":
          return a.name.localeCompare(b.name);
        case "popularity":
          // Convert generation count to number for comparison
          const countA = parseFloat(a.generation_count.replace(/[^\d.]/g, ""));
          const countB = parseFloat(b.generation_count.replace(/[^\d.]/g, ""));
          return countB - countA;
        default:
          return 0;
      }
    });
    
    // Apply pagination - only return the loaded models
    return result.slice(0, loadedModels);
  }, [models, searchQuery, filters, sortBy, loadedModels]);

  // Copy model ID to clipboard
  const copyModelId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: "Model ID Copied",
      description: "The model ID has been copied to your clipboard.",
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      modelType: [],
      providers: [],
      priceRange: [0, 3.5],
      arenaScore: [900, 1400],
      features: [],
      speed: [],
      freeOnly: false
    });
    setSearchQuery("");
  };

  // Get unique providers
  const uniqueProviders = useMemo(() => {
    const providers = new Set<string>();
    models.forEach(model => {
      model.providers.forEach(provider => {
        providers.add(provider.name);
      });
    });
    return Array.from(providers);
  }, [models]);

  // Get active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.modelType.length > 0) count += filters.modelType.length;
    if (filters.providers.length > 0) count += filters.providers.length;
    if (filters.features.length > 0) count += filters.features.length;
    if (filters.speed.length > 0) count += filters.speed.length;
    if (filters.freeOnly) count += 1;
    return count;
  }, [filters]);

  // Load more models
  const loadMoreModels = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setLoadedModels(prev => prev + 12);
      setIsLoading(false);
    }, 1000);
  };

  // Load all models
  const loadAllModels = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setLoadedModels(models.length);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background pt-16">
        <Header />
        
        <div className="flex">
          <AppSidebar 
            filters={filters}
            onFilterChange={setFilters}
            uniqueProviders={uniqueProviders}
            toggleFilter={toggleFilter}
            activeFilterCount={activeFilterCount}
            resetFilters={resetFilters}
          />
          
          <main className="flex-1 p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Main Content */}
              <div className="flex-1">
                {/* Top Controls */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search models, providers, features..."
                      className="pl-10 border-[#95d63f] focus-visible:ring-[#95d63f] hover:border-[#95d63f]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px] border-[#95d63f] focus:ring-[#95d63f] hover:border-[#95d63f]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="arena_score">Arena Score (high to low)</SelectItem>
                        <SelectItem value="price_low">Price (low to high)</SelectItem>
                        <SelectItem value="price_high">Price (high to low)</SelectItem>
                        <SelectItem value="date">Date (newest first)</SelectItem>
                        <SelectItem value="name">Name (A-Z)</SelectItem>
                        <SelectItem value="popularity">Popularity (most used)</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="border-[#95d63f] text-[#95d63f] hover:bg-[#95d63f] hover:text-black dark:hover:text-white"
                      onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                    >
                      {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                    </Button>
                    
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                      <SheetTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="lg:hidden border-[#95d63f] text-[#95d63f] hover:bg-[#95d63f] hover:text-black dark:hover:text-white"
                        >
                          <Filter className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-80 p-0">
                        <SheetHeader className="p-4 border-b">
                          <SheetTitle>Filters</SheetTitle>
                        </SheetHeader>
                        <div className="p-4 overflow-y-auto">
                          <Filters 
                            filters={filters}
                            onFilterChange={setFilters}
                            uniqueProviders={uniqueProviders}
                            toggleFilter={toggleFilter}
                          />
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>

                {/* Current Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="bg-[#95d63f] text-black hover:bg-[#95d63f]">
                    All
                  </Badge>
                  <Badge variant="secondary" className="bg-[#95d63f] text-black hover:bg-[#95d63f]">
                    Text to Image
                  </Badge>
                  <Badge variant="secondary" className="bg-[#95d63f] text-black hover:bg-[#95d63f]">
                    Image to Image
                  </Badge>
                  <Badge variant="secondary" className="bg-[#95d63f] text-black hover:bg-[#95d63f]">
                    Text to Video
                  </Badge>
                  <Badge variant="secondary" className="bg-[#95d63f] text-black hover:bg-[#95d63f]">
                    Image to Video
                  </Badge>
                  <Badge variant="secondary" className="bg-[#95d63f] text-black hover:bg-[#95d63f]">
                    Free
                  </Badge>
                </div>

                {/* Model Count */}
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredAndSortedModels.length} of {models.length} models
                  </p>
                </div>

                {/* Models Grid/List */}
                {filteredAndSortedModels.length > 0 ? (
                  <div className={viewMode === "grid" 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                    : "space-y-4"
                  }>
                    {filteredAndSortedModels.map((model) => (
                      <ModelCard 
                        key={model.id} 
                        model={model} 
                        viewMode={viewMode}
                        isNew={isNewModel(model.release_date)}
                        onCopy={copyModelId}
                        providerLogos={providerLogos}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-2xl font-bold mb-2">No models found</div>
                    <p className="text-muted-foreground mb-4">
                      No models match your search. Try different keywords or clear filters.
                    </p>
                    <Button 
                      onClick={resetFilters}
                      className="bg-[#95d63f] text-black hover:bg-[#95d63f]/90"
                    >
                      Browse all models
                    </Button>
                  </div>
                )}

                {/* Load More */}
                <div className="mt-8 text-center">
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#95d63f]"></div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <Button 
                        variant="outline" 
                        onClick={loadMoreModels}
                        disabled={loadedModels >= filteredAndSortedModels.length}
                        className="border-[#95d63f] text-[#95d63f] hover:bg-[#95d63f] hover:text-black dark:hover:text-white"
                      >
                        Load More
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={loadAllModels}
                        disabled={loadedModels >= filteredAndSortedModels.length}
                        className="border-[#95d63f] text-[#95d63f] hover:bg-[#95d63f] hover:text-black dark:hover:text-white"
                      >
                        Load All
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

// AppSidebar Component
function AppSidebar({ 
  filters, 
  onFilterChange, 
  uniqueProviders, 
  toggleFilter, 
  activeFilterCount, 
  resetFilters 
}: { 
  filters: any; 
  onFilterChange: (filters: any) => void;
  uniqueProviders: string[];
  toggleFilter: (filterType: string, value: string) => void;
  activeFilterCount: number;
  resetFilters: () => void;
}) {
  return (
    <Sidebar className="border-r pt-16">
      <SidebarHeader>
        <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
          <h2 className="text-lg font-semibold">Filters</h2>
          {activeFilterCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="text-xs h-6 px-2"
            >
              Clear all
            </Button>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="bg-card rounded-lg border m-2">
          <div className="p-4">
            <div className="flex items-center justify-between w-full p-4 text-left">
              <span className="font-medium">Filter Options</span>
              <ChevronRight className="h-4 w-4" />
            </div>
            <div className="p-4 pt-0 border-t">
              <Filters 
                filters={filters}
                onFilterChange={onFilterChange}
                uniqueProviders={uniqueProviders}
                toggleFilter={toggleFilter}
              />
            </div>
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-2 p-2">
          <Button 
            variant="outline" 
            onClick={resetFilters}
            disabled={activeFilterCount === 0}
            className="border-[#95d63f] text-[#95d63f] hover:bg-black hover:text-white w-full"
          >
            Reset Filters
          </Button>
          <Button 
            className="bg-[#95d63f] text-black hover:bg-[#95d63f]/90 w-full"
          >
            Request Models
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

// Filters Component
function Filters({ 
  filters, 
  onFilterChange, 
  uniqueProviders,
  toggleFilter
}: { 
  filters: any; 
  onFilterChange: (filters: any) => void;
  uniqueProviders: string[];
  toggleFilter: (filterType: string, value: string) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Model Type */}
      <Accordion type="single" collapsible defaultValue="model-type">
        <AccordionItem value="model-type">
          <AccordionTrigger>Model Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <Checkbox 
                  id="text-to-image"
                  checked={filters.modelType.includes("text-to-image")}
                  onCheckedChange={() => toggleFilter("modelType", "text-to-image")}
                />
                <label 
                  htmlFor="text-to-image" 
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Text to Image
                </label>
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="image-to-image"
                  checked={filters.modelType.includes("image-to-image")}
                  onCheckedChange={() => toggleFilter("modelType", "image-to-image")}
                />
                <label 
                  htmlFor="image-to-image" 
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Image to Image
                </label>
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="text-to-video"
                  checked={filters.modelType.includes("text-to-video")}
                  onCheckedChange={() => toggleFilter("modelType", "text-to-video")}
                />
                <label 
                  htmlFor="text-to-video" 
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Text to Video
                </label>
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="image-to-video"
                  checked={filters.modelType.includes("image-to-video")}
                  onCheckedChange={() => toggleFilter("modelType", "image-to-video")}
                />
                <label 
                  htmlFor="image-to-video" 
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Image to Video
                </label>
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="free-only"
                  checked={filters.freeOnly}
                  onCheckedChange={() => onFilterChange({...filters, freeOnly: !filters.freeOnly})}
                />
                <label 
                  htmlFor="free-only" 
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Free Models Only
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Providers */}
      <Accordion type="single" collapsible defaultValue="providers">
        <AccordionItem value="providers">
          <AccordionTrigger>Providers</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search providers..."
                  className="pl-8 mb-3 border-[#95d63f] focus-visible:ring-[#95d63f]"
                />
              </div>
              
              <div className="max-h-60 overflow-y-auto">
                {uniqueProviders.map(provider => (
                  <div key={provider} className="flex items-center py-1.5">
                    <Checkbox 
                      id={`provider-${provider}`}
                      checked={filters.providers.includes(provider)}
                      onCheckedChange={() => toggleFilter("providers", provider)}
                    />
                    <label 
                      htmlFor={`provider-${provider}`} 
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                    >
                      {providerLogos[provider] && providerLogos[provider] !== "NA" ? (
                        <img 
                          src={providerLogos[provider]} 
                          alt={provider} 
                          className="w-4 h-4 mr-2 dark:brightness-0 dark:invert" 
                        />
                      ) : (
                        <span className="w-4 h-4 mr-2 text-xs flex items-center justify-center bg-muted rounded">
                          NA
                        </span>
                      )}
                      {provider}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Pricing Range */}
      <Accordion type="single" collapsible defaultValue="pricing">
        <AccordionItem value="pricing">
          <AccordionTrigger>Pricing Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={filters.priceRange}
                min={0}
                max={3.5}
                step={0.001}
                onValueChange={(value) => onFilterChange({...filters, priceRange: value as [number, number]})}
                className="py-4 [&>span]:bg-[#95d63f]"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Free</span>
                <span>$0.001</span>
                <span>$0.01</span>
                <span>$0.10</span>
                <span>$1.00</span>
                <span>$3.50+</span>
              </div>
              <div className="text-sm">
                ${filters.priceRange[0].toFixed(3)} - ${filters.priceRange[1].toFixed(3)}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Arena Score */}
      <Accordion type="single" collapsible defaultValue="arena">
        <AccordionItem value="arena">
          <AccordionTrigger>Arena Score</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={filters.arenaScore}
                min={900}
                max={1400}
                step={1}
                onValueChange={(value) => onFilterChange({...filters, arenaScore: value as [number, number]})}
                className="py-4 [&>span]:bg-[#95d63f]"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>900</span>
                <span>1000</span>
                <span>1100</span>
                <span>1200</span>
                <span>1300</span>
                <span>1400</span>
              </div>
              <div className="text-sm">
                {filters.arenaScore[0]} - {filters.arenaScore[1]}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Features */}
      <Accordion type="single" collapsible defaultValue="features">
        <AccordionItem value="features">
          <AccordionTrigger>Features</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <Checkbox 
                  id="edit"
                  checked={filters.features.includes("edit")}
                  onCheckedChange={() => toggleFilter("features", "edit")}
                />
                <label 
                  htmlFor="edit" 
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Image Editing Support
                </label>
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="mask"
                  checked={filters.features.includes("mask")}
                  onCheckedChange={() => toggleFilter("features", "mask")}
                />
                <label 
                  htmlFor="mask" 
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Masking Support
                </label>
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="quality"
                  checked={filters.features.includes("quality")}
                  onCheckedChange={() => toggleFilter("features", "quality")}
                />
                <label 
                  htmlFor="quality" 
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Quality Control
                </label>
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="free-tier"
                  checked={filters.features.includes("free-tier")}
                  onCheckedChange={() => toggleFilter("features", "free-tier")}
                />
                <label 
                  htmlFor="free-tier" 
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Free Tier Available
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Speed/Performance */}
      <Accordion type="single" collapsible defaultValue="speed">
        <AccordionItem value="speed">
          <AccordionTrigger>Speed/Performance</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <Checkbox 
                  id="instant"
                  checked={filters.speed.includes("instant")}
                  onCheckedChange={() => toggleFilter("speed", "instant")}
                />
                <label 
                  htmlFor="instant" 
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Instant (&lt;2s)
                </label>
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="fast"
                  checked={filters.speed.includes("fast")}
                  onCheckedChange={() => toggleFilter("speed", "fast")}
                />
                <label 
                  htmlFor="fast" 
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Fast (2-5s)
                </label>
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="standard"
                  checked={filters.speed.includes("standard")}
                  onCheckedChange={() => toggleFilter("speed", "standard")}
                />
                <label 
                  htmlFor="standard" 
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Standard (5-15s)
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

// Model Card Component
function ModelCard({ 
  model, 
  viewMode,
  isNew,
  onCopy,
  providerLogos
}: { 
  model: Model; 
  viewMode: "grid" | "list";
  isNew: boolean;
  onCopy: (id: string) => void;
  providerLogos: Record<string, string>;
}) {
  const price = model.providers[0]?.pricing?.value || 0;
  const providerName = model.providers[0]?.name || "";
  const providerLogo = providerLogos[providerName];
  
  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-all ${viewMode === 'list' ? 'flex' : ''}`}>
      <div className={`${viewMode === 'list' ? 'w-1/3' : ''}`}>
        <div className="relative aspect-video bg-muted">
          {model.examples[0]?.video ? (
            <div className="w-full h-full flex items-center justify-center bg-black/10">
              <Play className="h-8 w-8 text-white/80" />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-blue-500 text-white">
              {model.arena_score}
            </Badge>
          </div>
          
          <div className="absolute top-2 right-2">
            {price === 0 ? (
              <Badge variant="secondary" className="bg-green-500 text-white">
                FREE
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-orange-500 text-white">
                ${price.toFixed(3)}
              </Badge>
            )}
          </div>
          
          {isNew && (
            <div className="absolute bottom-2 left-2">
              <Badge variant="default" className="bg-[#95d63f] text-black animate-pulse">
                NEW
              </Badge>
            </div>
          )}
        </div>
      </div>
      
      <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">{model.name}</h3>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onCopy(model.id)}
            className="h-8 w-8 hover:bg-[#95d63f] hover:text-black"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2 mt-1">
          {providerLogo && providerLogo !== "NA" ? (
            <img 
              src={providerLogo} 
              alt={providerName} 
              className="w-6 h-6 object-contain dark:brightness-0 dark:invert"
            />
          ) : (
            <span className="text-xs bg-muted rounded-full w-6 h-6 flex items-center justify-center">
              NA
            </span>
          )}
          <span className="text-sm text-muted-foreground">{providerName}</span>
        </div>
        
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {model.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {model.supported_params.map((param) => (
            <Badge key={param} variant="outline" className="text-xs border-[#95d63f] text-[#95d63f]">
              {param}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {model.generation_count} generations
          </span>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              className="border-[#95d63f] text-[#95d63f] hover:bg-[#95d63f] hover:text-black"
            >
              Try Now
            </Button>
            <Button 
              size="sm"
              className="bg-[#95d63f] text-black hover:bg-[#95d63f]/90"
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}