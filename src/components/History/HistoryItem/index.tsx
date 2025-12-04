"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, Trash2, Loader2 } from "lucide-react";
import { GenerationHistory } from "@/types/history";
import { useDownload } from "@/hooks/useDownload";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, auth } from "@/firebase";
import { customToast } from "@/common";
import { useAtom } from "jotai";
import { historyViewAtom } from "@/atoms/historyViewAtom";
import { useHandleDialogType } from "@/hooks/useHandleDialogType";

interface HistoryItemProps {
    /** Generation data to display */
    generation: GenerationHistory;
    /** Callback when item is deleted */
    onDelete?: () => void;
    /** Function to add item ID to deleted items list for optimistic UI updates */
    setDeletedItemsId?: React.Dispatch<React.SetStateAction<string[]>>;
}

/**
 * Component to display a single generation history item
 * Shows thumbnail with download/delete buttons on hover
 * Clicking opens a dialog to view full image/video
 */
export default function HistoryItem({ generation, onDelete, setDeletedItemsId }: HistoryItemProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const { downloadResult } = useDownload();
    const [, setHistoryView] = useAtom(historyViewAtom);
    const { handleDialogType } = useHandleDialogType();

    // Get the first result item (most generations have one result)
    const result = generation.result?.[0];

    // Determine media type and URL
    const isVideo = generation.generationType === "video";
    const thumbnailUrl = result?.thumbnail;
    const mediaUrl = isVideo ? result?.video : result?.image;
    const displayUrl = thumbnailUrl || mediaUrl || "";

    // Handle download
    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (result) {
            downloadResult({
                video: result.video,
                image: result.image,
                thumbnail: result.thumbnail,
                type: isVideo ? "video" : "image",
            });
        }
    };

    // Handle delete - updates isDeleted field to true in Firebase with optimistic UI updates
    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();

        // Get current user ID from auth
        const userId = auth.currentUser?.uid;
        if (!userId) {
            customToast.error("You must be logged in to delete items");
            return;
        }

        // Validate required fields
        if (!generation.id) {
            console.error("[HistoryItem] Missing generation ID:", generation);
            customToast.error("Cannot delete: missing generation ID");
            return;
        }

        // Start deletion immediately without confirmation
        setIsDeleting(true);
        const loadingToast = customToast.loading("Deleting...");

        try {
            // Create Firestore document reference
            const generationRef = doc(db, "users", userId, "generations", generation.id);

            console.log("[HistoryItem] Attempting to delete generation:", {
                userId,
                generationId: generation.id,
                path: `users/${userId}/generations/${generation.id}`,
            });

            // Verify document exists before updating
            const docSnapshot = await getDoc(generationRef);
            if (!docSnapshot.exists()) {
                throw new Error("Document not found in Firestore");
            }

            console.log("[HistoryItem] Document exists, updating isDeleted field...");

            // Update Firebase to mark generation as deleted with deletedAt timestamp
            await updateDoc(generationRef, {
                isDeleted: true,
                deletedAt: new Date(),
            });

            console.log("[HistoryItem] Successfully marked generation as deleted:", generation.id);

            // Optimistic UI update - immediately hide the item
            if (setDeletedItemsId) {
                setDeletedItemsId((prev) => [...prev, generation.id!]);
            }

            // Dismiss loading toast and show success
            customToast.dismiss(loadingToast);
            const mediaType = isVideo ? "video" : "image";
            customToast.success(`${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} deleted successfully`);

            // Call onDelete callback if provided
            onDelete?.();
        } catch (error) {
            console.error("[HistoryItem] Error deleting generation:", {
                error,
                generationId: generation.id,
                userId,
                errorMessage: error instanceof Error ? error.message : "Unknown error",
                errorStack: error instanceof Error ? error.stack : undefined,
            });

            // Dismiss loading toast
            customToast.dismiss(loadingToast);

            // Show user-friendly error message
            let errorMessage = "Unknown error occurred";
            if (error instanceof Error) {
                errorMessage = error.message;
                // Handle common Firestore errors
                if (error.message.includes("permission") || error.message.includes("Permission")) {
                    errorMessage = "You don't have permission to delete this item";
                } else if (error.message.includes("not found")) {
                    errorMessage = "Item not found. It may have already been deleted.";
                }
            }
            customToast.error(`Failed to delete creation: ${errorMessage}`);
        } finally {
            setIsDeleting(false);
        }
    };

    // Handle view dialog
    const handleView = () => {
        setHistoryView(generation);
        handleDialogType("historyView", "add");
    };

    // Get effect type label for top-left button
    const getEffectTypeLabel = () => {
        return isVideo ? "Video Effects" : "Image Effects";
    };

    return (
        <div
            className="group relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 shadow-md hover:shadow-lg transition-all duration-300"
            onClick={handleView}
        >
            {/* Media Display */}
            <div className="relative w-full h-full">
                {isVideo ? (
                    // Video thumbnail
                    displayUrl ? (
                        <Image
                            src={displayUrl}
                            alt="Video thumbnail"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            unoptimized
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <span className="text-gray-400 text-sm">No thumbnail</span>
                        </div>
                    )
                ) : (
                    // Image display
                    displayUrl ? (
                        <Image
                            src={displayUrl}
                            alt="Generated image"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            unoptimized
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <span className="text-gray-400 text-sm">No image</span>
                        </div>
                    )
                )}

                {/* Hover overlay with action buttons */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Top left: Effect type label */}
                    <div className="absolute top-2 left-2">
                        <div className="bg-black/70 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                            <svg
                                className="w-3 h-3 sm:w-4 sm:h-4"
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
                            <span>{getEffectTypeLabel()}</span>
                        </div>
                    </div>

                    {/* Top right: Download and Delete buttons (vertically stacked) */}
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                        <button
                            onClick={handleDownload}
                            className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-sm hover:bg-black/80 flex items-center justify-center shadow-lg transition-all hover:scale-110 cursor-pointer"
                            title="Download"
                        >
                            <Download className="w-4 h-4 text-white" />
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-sm hover:bg-black/80 flex items-center justify-center shadow-lg transition-all hover:scale-110 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed relative"
                            title={isDeleting ? "Deleting..." : "Delete"}
                        >
                            {isDeleting ? (
                                <Loader2 className="w-4 h-4 text-white animate-spin" />
                            ) : (
                                <Trash2 className="w-4 h-4 text-white" />
                            )}
                        </button>
                    </div>

                    {/* Bottom: "See image/video" button */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                        <div className="text-center">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleView();
                                }}
                                className="bg-white text-gray-900 text-sm md:text-base font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                            >
                                See {isVideo ? "video" : "image"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

