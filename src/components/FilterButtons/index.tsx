"use client";

import { Button } from "@/components/ui/button";

export type FilterType = "all" | "image-effects" | "video-effects";

export interface FilterOption {
    value: FilterType;
    label: string;
}

interface FilterButtonsProps {
    /** Currently active filter */
    activeFilter: FilterType;
    /** Callback when filter changes */
    onFilterChange: (filter: FilterType) => void;
    /** Array of filter options to display */
    filters: FilterOption[];
    /** Optional className for container */
    className?: string;
}

/**
 * Reusable filter buttons component
 * Extracted from AllToolsClient for use across multiple pages
 * Displays filter buttons with active/inactive states
 */
export default function FilterButtons({
    activeFilter,
    onFilterChange,
    filters,
    className = "",
}: FilterButtonsProps) {
    return (
        <div className={`flex items-center gap-2 sm:gap-3 md:gap-4 justify-center md:justify-start w-full md:w-auto flex-nowrap overflow-x-auto ${className}`}>
            {filters.map((filter) => (
                <Button
                    key={filter.value}
                    variant={activeFilter === filter.value ? "dark" : "outline"}
                    className="py-2.5 sm:py-3 px-3 sm:px-4 md:px-6 h-10 sm:h-11 rounded-sm text-xs sm:text-sm md:text-base whitespace-nowrap shrink-0"
                    onClick={() => onFilterChange(filter.value)}
                >
                    {filter.label}
                </Button>
            ))}
        </div>
    );
}


