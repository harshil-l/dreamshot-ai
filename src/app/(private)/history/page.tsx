"use client";

import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { dialogAtom } from "@/atoms/dialogAtom";
import { userAuthAtom } from "@/atoms/userAuthAtom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import FilterButtons, { FilterType } from "@/components/FilterButtons";
import { useUserGenerations } from "@/hooks/useUserGenerations";
import HistoryGrid from "@/components/History/HistoryGrid";
import HistoryViewDialog from "@/components/History/HistoryViewDialog";

/**
 * History page component
 * Displays all user creations from Firebase with filtering capabilities
 * Requires authentication to access
 */
export default function HistoryPage() {
    const [user] = useAtom(userAuthAtom);
    const [, setDialogType] = useAtom(dialogAtom);
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");
    // Track deleted item IDs for optimistic UI updates
    const [deletedItemsId, setDeletedItemsId] = useState<string[]>([]);

    // Fetch user generations
    const userId = user && user !== "loading" ? user.uid : undefined;
    const { generations, loading, error } = useUserGenerations(userId);

    // Check authentication
    useEffect(() => {
        // Don't redirect if still loading
        if (user !== "loading" && !user) {
            setDialogType(["login"]);
            return;
        }
    }, [user, setDialogType]);

    // Filter options for the filter buttons
    const filterOptions = [
        { value: "all" as FilterType, label: "All" },
        { value: "image-effects" as FilterType, label: "Image Effects" },
        { value: "video-effects" as FilterType, label: "Video Effects" },
    ];

    // Show login prompt if not authenticated
    if (!user) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center pt-20 bg-gradient-to-b from-white via-blue-50 to-blue-600 relative">
                {/* Cloud background overlay */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: 'url(/assets/cloud-background.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                />
                <Header />
                <div className="flex flex-col items-center gap-4 bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-200/50 shadow-lg shadow-blue-100/50 relative z-10">
                    <h2 className="text-2xl font-bold text-gray-800">Login to View History</h2>
                    <Button
                        onClick={() => setDialogType(["login"])}
                        className="px-6 py-2 rounded-full hover:opacity-80 transition-opacity"
                    >
                        Login
                    </Button>
                </div>
            </div>
        );
    }

    // Show loading state
    if (user === "loading" || loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 relative">
                {/* Cloud background overlay */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: 'url(/assets/cloud-background.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                />
                <div className="animate-spin relative z-10">
                    <svg
                        className="h-8 w-8 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex mt-20 flex-col bg-gradient-to-b from-white via-blue-50 to-blue-300 relative">
            {/* Cloud background overlay */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'url(/assets/cloud-background.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            />

            <div className="w-full flex flex-col items-center justify-start flex-1 pt-4 pb-8 relative z-10">
                <div className="text-gray-800 max-w-7xl w-full px-4">
                    {/* Header with back button */}
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-all duration-200 mb-4 text-gray-700 hover:text-blue-600 group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        <h1 className="text-lg sm:text-lg md:text-xl font-semibold text-gray-800">My History</h1>
                    </button>

                    {/* Title and Description */}
                    <div className="flex flex-col text-center items-center gap-4 justify-center mb-6 px-4">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold px-4">
                            My History
                        </h2>
                        <p className="text-gray-600 max-w-xl text-sm md:text-base">
                            View your recent creations. All your generated content in one place.
                        </p>
                    </div>

                    {/* Error state */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center">
                            <p className="font-semibold">Error loading history</p>
                            <p className="text-sm mt-1">{error.message}</p>
                        </div>
                    )}

                    {/* Filter buttons */}
                    <div className="w-full px-2 sm:px-4 mb-6 flex justify-center">
                        <FilterButtons
                            activeFilter={activeFilter}
                            onFilterChange={setActiveFilter}
                            filters={filterOptions}
                        />
                    </div>

                    {/* History Grid */}
                    <HistoryGrid
                        generations={generations}
                        filter={activeFilter}
                        deletedItemsId={deletedItemsId}
                        setDeletedItemsId={setDeletedItemsId}
                    />
                </div>
            </div>

            {/* History View Dialog */}
            <HistoryViewDialog />
        </div>
    );
}

