"use client";

import { useState, useMemo } from "react";
import ToolCard from "@/components/PopularTool/ToolCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { ToolConfigJson } from "@/config/tools.server";

interface AllToolsClientProps {
    tools: ToolConfigJson[];
}

type FilterType = "all" | "image-effects" | "video-effects";


export default function AllToolsClient({ tools }: AllToolsClientProps) {
        // Filter state: "all" shows all tools, "image-effects" or "video-effects" filters by category
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");


    const [searchQuery, setSearchQuery] = useState("");

    // Convert ToolConfigJson to DashboardPopularTool format for display
    const toolsForDisplay = useMemo(() => {
        return tools.map((tool) => ({
            title: tool.title,
            imageUrl: tool.cardImage || tool.transformationImages.transformationPreview || "",
            // Include category and id for navigation
            category: tool.postPrefix || tool.toolCategory,
            id: tool.id,
            toolCategory: tool.toolCategory,
        }));
    }, [tools]);

    // Filter tools based on active filter and search query
    const filteredTools = useMemo(() => {
        let filtered = toolsForDisplay;

        if (activeFilter !== "all") {
            filtered = filtered.filter((tool) => tool.toolCategory === activeFilter);
        }

        // Apply search filter (case-insensitive partial match on title)
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            filtered = filtered.filter((tool) =>
                tool.title.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [toolsForDisplay, activeFilter, searchQuery]);

    const handleFilterClick = (filter: FilterType) => {
        setActiveFilter(filter);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="flex flex-col items-center gap-10 justify-center pt-20 min-h-screen" style={{
            backgroundImage: 'url(/assets/cloud-background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
            {/* Title and Description */}
            <div className="flex flex-col text-center items-center gap-10 justify-center mt-15 px-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold px-4">
                    Discover Our Full Toolkit
                </h1>
                <p className="text-gray-500 max-w-xl">
                    Discover the complete collection of AI filters and effects. Whatever your style, we&apos;ve got a tool to bring your vision to life.
                </p>
            </div>

            {/* Filters and Search */}
            <div className="w-full max-w-7xl mx-auto">
                <div className="flex items-center gap-4 justify-between md:flex-row flex-col">
                    <div className="flex items-center gap-4">
                        <Button
                            variant={activeFilter === "all" ? "dark" : "outline"}
                            className="py-3 px-6 h-10 rounded-sm"
                            onClick={() => handleFilterClick("all")}
                        >
                            All
                        </Button>
                        <Button
                            variant={activeFilter === "image-effects" ? "dark" : "outline"}
                            className="py-3 px-6 h-10 rounded-sm"
                            onClick={() => handleFilterClick("image-effects")}
                        >
                            Image Tools
                        </Button>
                        <Button
                            variant={activeFilter === "video-effects" ? "dark" : "outline"}
                            className="py-3 px-6 h-10 rounded-sm"
                            onClick={() => handleFilterClick("video-effects")}
                        >
                            Video Tools
                        </Button>
                    </div>
                    <div className="relative w-full max-w-md">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <Search className="w-4 h-4" />
                        </span>
                        <Input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full h-10 pl-10 max-w-xl text-black shadow-none rounded-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full max-w-7xl px-4">
                {filteredTools.map((tool, index) => {
                    // Generate URL using category and id for navigation
                    const toolUrl = `/${tool.category}/${tool.id}`;

                    // Extract only the properties needed for ToolCard (title and imageUrl)
                    const cardContent = (
                        <ToolCard
                            key={`${tool.id}-${index}`}
                            tool={{ title: tool.title, imageUrl: tool.imageUrl }}
                        />
                    );

                    return (
                        <Link
                            key={`${tool.id}-${index}`}
                            href={toolUrl}
                            className="hover:opacity-80 transition-opacity"
                        >
                            {cardContent}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

