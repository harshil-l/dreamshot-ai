import { MediaBucket } from "@/classes/MedialBucket";
import {
    GENERATION_API_BASE_URL,
    PROJECT_ID,
} from "@/constants/runtime.constants";
import { ToolConfigJson } from "@/config/tools.server";
import axios, { AxiosError } from "axios";

interface ApiErrorResponse {
    message?: string;
    error?: string;
    [key: string]: unknown;
}

interface EnhancedError extends Error {
    status?: number;
    responseData?: unknown;
}

/**
 * Uploads a single image file to S3 using MediaBucket
 * @param file - The image file to upload
 * @param fileName - The desired file name for the uploaded image
 * @returns Promise resolving to the CDN URL of the uploaded image
 */
export async function uploadImageToS3(
    file: File,
    fileName: string
): Promise<string> {
    console.log(`[GENERATION_API] 📤 Uploading to S3:`, { fileName, fileSize: `${(file.size / 1024).toFixed(2)} KB` });
    const mediaBucket = new MediaBucket();
    const url = await mediaBucket.uploadFile(file, fileName);
    console.log(`[GENERATION_API] ✅ S3 upload complete:`, { url });
    return url;
}

/**
 * Constructs the generation API payload based on tool configuration and image URLs
 * @param toolConfig - The tool configuration from JSON
 * @param imageUrl - The CDN URL of the first uploaded image
 * @param imageUrl2 - Optional CDN URL of the second uploaded image (for dual upload)
 * @param userId - The current user's Firebase UID
 * @param isVideoGen - Whether this is for video generation (affects payload structure)
 * @returns The payload object ready to be sent to the generation API
 */
export function constructGenerationPayload(
    toolConfig: ToolConfigJson,
    imageUrl: string,
    imageUrl2?: string,
    userId?: string,
    isVideoGen: boolean = false
): Record<string, unknown> {
    // Build pathname from tool config
    const category = toolConfig.postPrefix || toolConfig.toolCategory;
    const pathname = `/${category}/${toolConfig.id}`;

    if (isVideoGen) {
        // Video generation payload structure (based on curl example)
        const imageUrls = imageUrl2 ? [imageUrl, imageUrl2] : [imageUrl];

        return {
            userId: userId || "",
            imageUrl: imageUrls, // Array for video-gen
            pathname: pathname,
            toolType: toolConfig.toolCategory,
            effectId: toolConfig.effectId || toolConfig.id,
            model: toolConfig.model || toolConfig.toolCategory,
            isPrivate: true,
            removeWatermark: true,
        };
    } else {
        // Image generation payload structure
        const basePayload: Record<string, unknown> = {
            effectId: toolConfig.effectId || toolConfig.id,
            modelId: toolConfig.model || toolConfig.toolCategory,
            userId: userId || "",
            model: toolConfig.model || toolConfig.toolCategory,
            modelIdToUse: toolConfig.effectId || toolConfig.id,
            removeWatermark: true,
            imageUrl: imageUrl, // String for image-gen
        };

        // Add second image URL if provided (for dual upload tools)
        if (imageUrl2) {
            basePayload.imageUrl2 = imageUrl2;
        }

        return basePayload;
    }
}

/**
 * Makes API call to the generation endpoint (image-gen or video-gen)
 * @param payload - The payload object to send to the API
 * @param endpoint - The endpoint path ("/image-gen" or "/video-gen")
 * @returns Promise resolving to the API response containing jobId and status
 */
export async function callGenerationAPI(
    payload: Record<string, unknown>,
    endpoint: string
): Promise<{ jobId: string; status: string }> {
    const url = `${GENERATION_API_BASE_URL}${endpoint}`;

    console.log(`[GENERATION_API] 🌐 Calling API:`, {
        url,
        endpoint,
        payloadKeys: Object.keys(payload),
    });

    // Log full payload for debugging
    console.log(`[GENERATION_API] 📦 Full payload:`, JSON.stringify(payload, null, 2));

    try {
        const response = await axios.post(url, payload, {
            headers: {
                "Content-Type": "application/json",
                "x-project-id": PROJECT_ID,
            },
        });

        console.log(`[GENERATION_API] ✅ API response received:`, {
            jobId: response.data.jobId,
            status: response.data.status,
            responseStatus: response.status,
        });

        return {
            jobId: response.data.jobId,
            status: response.data.status,
        };
    } catch (error: unknown) {
        // Extract error message from API response if available
        let errorMessage = 'Unknown error';
        let status: number | undefined;
        let responseData: unknown;

        if (error instanceof AxiosError) {
            status = error.response?.status;
            responseData = error.response?.data;

            if (responseData) {
                // Try to extract message from response
                if (typeof responseData === 'string') {
                    errorMessage = responseData;
                } else if (typeof responseData === 'object' && responseData !== null) {
                    const apiError = responseData as ApiErrorResponse;
                    errorMessage = apiError.message ||
                        apiError.error ||
                        JSON.stringify(responseData);
                }
            } else {
                errorMessage = error.message;
            }
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        // Log detailed error information
        console.error(`[GENERATION_API] ❌ API call failed:`, {
            url,
            endpoint,
            payload: JSON.stringify(payload, null, 2),
            errorMessage,
            errorResponse: responseData,
            errorStatus: status,
            errorHeaders: error instanceof AxiosError ? error.response?.headers : undefined,
        });

        // Create a more informative error with API response message
        const enhancedError = new Error(errorMessage) as EnhancedError;
        enhancedError.status = status;
        enhancedError.responseData = responseData;

        // Re-throw the enhanced error so it can be handled upstream
        throw enhancedError;
    }
}

