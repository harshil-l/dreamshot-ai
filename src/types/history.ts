import { Timestamp } from "firebase/firestore";

/**
 * Generation result item from Firebase
 * Each generation has a result array with one or more items
 */
export interface GenerationResult {
    /** Image URL (for image generations) */
    image?: string;
    /** Video URL (for video generations) */
    video?: string;
    /** Thumbnail URL (for both image and video) */
    thumbnail?: string;
    /** Type of result: "image" or "video" */
    type: "image" | "video";
    /** Status of the generation */
    status: "pending" | "completed" | "failed";
}

/**
 * Input data for the generation
 * Contains effect-specific information
 */
export interface GenerationInput {
    /** Effect ID (e.g., "birthdayhattophoto") */
    effectId?: string;
    /** Model ID to use */
    modelIdToUse?: string;
    /** Image URL for input */
    imageUrl?: string;
    /** Images URL (for video effects) */
    images?: string;
    /** Prompt text (for video effects) */
    prompt?: string;
    /** Pathname where generation was created */
    pathname?: string;
    /** Whether generation is private */
    isPrivate?: boolean;
}

/**
 * Complete generation history item from Firebase
 * Matches the structure stored in users/{userId}/generations/{generationId}
 */
export interface GenerationHistory {
    /** Unique generation ID (document ID in Firestore) */
    id?: string;
    /** When the generation was created */
    createdAt: Timestamp;
    /** When the generation was last updated */
    updatedAt?: Timestamp;
    /** Type of generation: "image" or "video" */
    generationType: "image" | "video";
    /** Model used for generation */
    model: string;
    /** Tool type category */
    toolType: string;
    /** Effect ID */
    effectId?: string;
    /** Input data for the generation */
    input: GenerationInput;
    /** Array of generation results */
    result: GenerationResult[];
    /** Status of the generation */
    status: "pending" | "completed" | "failed";
    /** User ID who created this generation */
    userId: string;
    /** Whether this generation has been deleted */
    isDeleted?: boolean;
    /** Timestamp when the generation was deleted */
    deletedAt?: Timestamp | Date;
    /** Whether this is a paid generation */
    isPaidGeneration?: boolean;
    /** Plan ID if applicable */
    planId?: string | null;
    /** Provider used (e.g., "fal") */
    provider?: string;
    /** Provider job ID */
    providerJobId?: string;
    /** Provider model ID */
    providerModelId?: string;
    /** Credits required for this generation */
    requiredCredits?: number;
    /** Whether error has been shown to user */
    hasErrorShown?: boolean;
    /** Generation ID (for video effects) */
    generationId?: string;
}


