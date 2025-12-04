"use client";

import { useMemo } from "react";
import { GenerationHistory } from "@/types/history";
import { FilterType } from "@/components/FilterButtons";
import HistoryItem from "../HistoryItem";

interface HistoryGridProps {
    /** Array of all generations */
    generations: GenerationHistory[];
    /** Current active filter */
    filter: FilterType;
    /** Array of deleted item IDs for optimistic UI updates */
    deletedItemsId: string[];
    /** Function to update deleted items list */
    setDeletedItemsId: React.Dispatch<React.SetStateAction<string[]>>;
}

/**
 * Component to display grid of history items with filtering
 * Filters generations based on generationType and displays in responsive grid
 * Handles empty state when no generations match the filter
 */
export default function HistoryGrid({ generations, filter, deletedItemsId, setDeletedItemsId }: HistoryGridProps) {
    // Filter generations based on active filter and exclude deleted items
    const filteredGenerations = useMemo(() => {
        // First, filter out deleted items (optimistic UI update)
        const visibleGenerations = generations.filter(
            (gen) => gen.id && !deletedItemsId.includes(gen.id)
        );

        // Then apply type filter
        if (filter === "all") {
            return visibleGenerations;
        }

        // Filter by generationType
        if (filter === "image-effects") {
            return visibleGenerations.filter((gen) => gen.generationType === "image");
        }

        if (filter === "video-effects") {
            return visibleGenerations.filter((gen) => gen.generationType === "video");
        }

        return visibleGenerations;
    }, [generations, filter, deletedItemsId]);

    // Show empty state if no generations
    if (filteredGenerations.length === 0) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-6 px-4">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        No {filter === "all" ? "" : filter === "image-effects" ? "image " : "video "}creations found
                    </h3>
                    <p className="text-gray-500 text-sm">
                        {filter === "all"
                            ? "Start creating to see your history here."
                            : `You haven't created any ${filter === "image-effects" ? "image" : "video"} effects yet.`}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full max-w-7xl px-4">
            {filteredGenerations.map((generation) => (
                <HistoryItem
                    key={generation.id || `${generation.createdAt}-${generation.generationType}`}
                    generation={generation}
                    setDeletedItemsId={setDeletedItemsId}
                />
            ))}
        </div>
    );
}

