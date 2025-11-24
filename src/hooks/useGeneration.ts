import { useState } from "react";
import { useAtomValue } from "jotai";
import { userAuthAtom } from "@/atoms/userAuthAtom";
import { useToolConfig } from "@/hooks/useToolConfig";
import {
    uploadImageToS3,
    constructGenerationPayload,
    callGenerationAPI,
} from "@/utils/generationApi";
import {
    IMAGE_GEN_ENDPOINT,
    VIDEO_GEN_ENDPOINT,
} from "@/constants/runtime.constants";

/**
 * Hook for managing image/video generation workflow
 * Handles uploading images to S3, calling generation API, and managing state
 */
export function useGeneration() {
    const user = useAtomValue(userAuthAtom);
    const toolConfig = useToolConfig();

    const [isUploading, setIsUploading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [jobId, setJobId] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);

    /**
     * Starts the generation process by uploading images and calling the API
     * @param file1 - The first image file (required)
     * @param file2 - Optional second image file (for dual upload tools)
     * @returns Promise resolving to jobId and status, or null if error
     */
    const startGeneration = async (
        file1: File,
        file2?: File
    ): Promise<{ jobId: string; status: string } | null> => {
        console.log(`[USE_GENERATION] 🎬 Starting generation process`, {
            toolId: toolConfig?.id,
            toolCategory: toolConfig?.toolCategory,
            effectId: toolConfig?.effectId,
            userId: user && user !== "loading" ? user.uid : "not available",
            hasSecondFile: !!file2,
        });

        if (!toolConfig) {
            console.error(`[USE_GENERATION] ❌ Tool configuration not found`);
            setError(new Error("Tool configuration not found"));
            return null;
        }

        if (!user || user === "loading" || !user.uid) {
            console.error(`[USE_GENERATION] ❌ User not logged in`);
            setError(new Error("User not logged in"));
            return null;
        }

        setError(null);
        setIsUploading(true);
        setIsGenerating(false);

        try {
            // Generate unique file names with timestamp
            const timestamp = Date.now();
            const fileName1 = `media/${timestamp}-${file1.name}`;
            const fileName2 = file2 ? `media/${timestamp}-${file2.name}` : undefined;

            console.log(`[USE_GENERATION] 📤 Step 1: Uploading images to S3`, {
                fileName1,
                fileName2,
                file1Size: `${(file1.size / 1024).toFixed(2)} KB`,
                file2Size: file2 ? `${(file2.size / 1024).toFixed(2)} KB` : "N/A",
            });

            // Upload first image to S3
            console.log(`[USE_GENERATION] 📤 Uploading first image...`);
            const imageUrl1 = await uploadImageToS3(file1, fileName1);
            console.log(`[USE_GENERATION] ✅ First image uploaded:`, { imageUrl1 });

            // Upload second image if provided (dual upload)
            let imageUrl2: string | undefined;
            if (file2 && fileName2) {
                console.log(`[USE_GENERATION] 📤 Uploading second image...`);
                imageUrl2 = await uploadImageToS3(file2, fileName2);
                console.log(`[USE_GENERATION] ✅ Second image uploaded:`, { imageUrl2 });
            }

            setIsUploading(false);
            setIsGenerating(true);

            // Determine endpoint based on tool category
            const endpoint =
                toolConfig.toolCategory === "video-effects"
                    ? VIDEO_GEN_ENDPOINT
                    : IMAGE_GEN_ENDPOINT;

            const isVideoGen = toolConfig.toolCategory === "video-effects";

            console.log(`[USE_GENERATION] 🔧 Step 2: Constructing payload and calling API`, {
                endpoint,
                toolCategory: toolConfig.toolCategory,
                isVideoGen,
            });

            // Construct payload (pass isVideoGen flag to handle different payload structures)
            const payload = constructGenerationPayload(
                toolConfig,
                imageUrl1,
                imageUrl2,
                user.uid,
                isVideoGen
            );

            console.log(`[USE_GENERATION] 📦 Payload constructed:`, {
                isVideoGen,
                effectId: payload.effectId,
                userId: payload.userId,
                model: payload.model,
                removeWatermark: payload.removeWatermark,
                imageUrl: payload.imageUrl,
                imageUrl2: payload.imageUrl2,
                pathname: payload.pathname,
                toolType: payload.toolType,
                isPrivate: payload.isPrivate,
                fullPayload: JSON.stringify(payload, null, 2),
            });

            // Call generation API
            console.log(`[USE_GENERATION] 🌐 Calling generation API: ${endpoint}`);
            const response = await callGenerationAPI(payload, endpoint);

            console.log(`[USE_GENERATION] ✅ API call successful:`, {
                jobId: response.jobId,
                status: response.status,
            });

            setJobId(response.jobId);
            setIsGenerating(false);

            return response;
        } catch (err) {
            let error: Error;
            if (err instanceof Error) {
                error = err;
            } else {
                error = new Error("Failed to start generation");
            }

            // Extract status code and response data if available
            interface ErrorWithStatus extends Error {
                status?: number;
                responseData?: unknown;
            }
            const errorWithStatus = error as ErrorWithStatus;
            const status = errorWithStatus.status;
            let errorMessage = error.message;

            // Handle specific error codes with user-friendly messages
            if (status === 402) {
                errorMessage = "Insufficient credits. Please upgrade your plan or purchase more credits to generate videos.";
            } else if (status === 400) {
                // Try to get more specific error from response
                if (errorWithStatus.responseData && typeof errorWithStatus.responseData === 'object') {
                    const response = errorWithStatus.responseData as { message?: string; error?: string };
                    errorMessage = response.message || response.error || "Invalid request. Please check your input and try again.";
                } else {
                    errorMessage = "Invalid request. Please check your input and try again.";
                }
            } else if (status === 401) {
                errorMessage = "Authentication failed. Please log in again.";
            } else if (status === 403) {
                errorMessage = "Access denied. You don't have permission to perform this action.";
            } else if (status === 500) {
                errorMessage = "Server error. Please try again later.";
            }

            console.error(`[USE_GENERATION] ❌ Error during generation:`, {
                error: error.message,
                status,
                responseData: errorWithStatus.responseData,
                stack: error.stack,
            });

            // Create error with enhanced message
            const enhancedError = new Error(errorMessage) as ErrorWithStatus;
            enhancedError.status = status;
            enhancedError.responseData = errorWithStatus.responseData;

            setError(enhancedError);
            setIsUploading(false);
            setIsGenerating(false);
            return null;
        }
    };

    /**
     * Resets the generation state (useful for starting a new generation)
     */
    const reset = () => {
        setJobId(null);
        setError(null);
        setIsUploading(false);
        setIsGenerating(false);
    };

    return {
        startGeneration,
        isUploading,
        isGenerating,
        jobId,
        error,
        reset,
    };
}

