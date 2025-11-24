'use client';

import { useToolConfig } from "@/hooks/useToolConfig";
import { useGeneration } from "@/hooks/useGeneration";
import { useFirebaseGenerationWatcher } from "@/hooks/useFirebaseGenerationWatcher";
import { useFileUpload, useDualFileUpload } from "@/hooks/useFileUpload";
import { useDownload } from "@/hooks/useDownload";
import { useAtomValue } from "jotai";
import { userAuthAtom } from "@/atoms/userAuthAtom";
import { useHandleDialogType } from "@/hooks/useHandleDialogType";
import { customToast } from "@/common";
import { useEffect } from "react";
import { UploadContainer } from "./UploadContainer";
import { DualUploadContainer } from "./DualUploadContainer";
import { GenerateButton } from "./GenerateButton";
import { SampleImages } from "./SampleImages";

/**
 * PlaygroundSection component for tool pages
 * Displays upload area, transformation preview, and sample images
 * Supports both single and dual upload modes based on tool config
 * Integrates with backend for image/video generation
 */
export default function PlaygroundSection() {
    const toolConfig = useToolConfig();
    const { handleDialogType } = useHandleDialogType();
    const user = useAtomValue(userAuthAtom);
    const { downloadResult } = useDownload();

    // Check if dual upload is required
    const isDualUpload = toolConfig?.inputType === "dual" && toolConfig?.dualUploadLabels;

    // File upload hooks - use appropriate hook based on upload mode
    const singleUpload = useFileUpload();
    const dualUpload = useDualFileUpload();

    // Use appropriate upload state based on mode
    const uploadedFile = isDualUpload ? dualUpload.uploadedFile1 : singleUpload.uploadedFile;
    const uploadedImage = isDualUpload ? dualUpload.uploadedImage1 : singleUpload.uploadedImage;
    const uploadedFile2 = isDualUpload ? dualUpload.uploadedFile2 : null;
    const uploadedImage2 = isDualUpload ? dualUpload.uploadedImage2 : null;

    // Generation hooks
    const {
        startGeneration,
        isUploading,
        isGenerating,
        jobId,
        error: generationError,
        reset: resetGeneration,
    } = useGeneration();

    const { status, result, error: watcherError } = useFirebaseGenerationWatcher(
        jobId,
        user && user !== 'loading' ? user.uid : undefined
    );

    // Use tool config data if available, otherwise use defaults
    const title = toolConfig?.playgroundTitle || "Ghibli Filter";
    const description = toolConfig?.playgroundDescription || "Transform your photos into enchanting Ghibli-style artwork with AI. Relive your memories in a magical, hand-painted world.";
    const buttonText = toolConfig?.buttonText || "Apply Ghibli Filter";
    const creditCost = toolConfig?.credit || 1;
    const sampleImages = toolConfig?.sampleImages || [];

    // Dynamic transformation images - check if transformationResult exists
    // Trim whitespace from URLs to prevent Next.js Image errors
    const transformationPreview = (toolConfig?.transformationImages?.transformationPreview || "/assets/Playground/2.png").trim();
    const transformationResult = toolConfig?.transformationImages?.transformationResult?.trim();

    // Handle file upload - delegate to appropriate hook
    const handleFileUpload = async (file: File, isSecond: boolean = false) => {
        console.log(`[PLAYGROUND] 📤 Image upload started:`, {
            isSecond,
            fileName: file.name,
            fileSize: `${(file.size / 1024).toFixed(2)} KB`,
            fileType: file.type,
        });

        if (isDualUpload) {
            await dualUpload.handleFileUpload(file, isSecond);
        } else {
            await singleUpload.handleFileUpload(file);
        }
    };

    // Handle process button click
    const handleProcess = async () => {
        console.log(`[PLAYGROUND] 🚀 Generate button clicked`, {
            isDualUpload,
            hasFirstImage: !!uploadedFile,
            hasSecondImage: !!uploadedFile2,
            userId: user && user !== 'loading' ? user.uid : 'not logged in',
            toolConfig: toolConfig?.id,
        });

        // Check if user is logged in
        if (!user || user === 'loading' || !user.uid) {
            console.log(`[PLAYGROUND] ❌ User not logged in`);
            customToast.error("Please log in to generate");
            handleDialogType("login", "add");
            return;
        }

        // Validate uploads
        if (!uploadedFile) {
            console.log(`[PLAYGROUND] ❌ First image not uploaded`);
            customToast.error("Please upload an image");
            return;
        }

        if (isDualUpload && !uploadedFile2) {
            console.log(`[PLAYGROUND] ❌ Second image not uploaded (dual upload required)`);
            customToast.error("Please upload both images");
            return;
        }

        console.log(`[PLAYGROUND] ✅ Validation passed, starting generation process...`);

        // Start generation
        const response = await startGeneration(uploadedFile, uploadedFile2 || undefined);

        if (!response) {
            console.error(`[PLAYGROUND] ❌ Generation failed to start:`, generationError);
            customToast.error(generationError?.message || "Failed to start generation");
            return;
        }

        console.log(`[PLAYGROUND] ✅ Generation started successfully:`, {
            jobId: response.jobId,
            status: response.status,
        });
        customToast.success("Generation started! Processing...");
    };

    // Show result when generation completes
    useEffect(() => {
        if (status === "completed" && result && result.length > 0) {
            console.log(`[PLAYGROUND] 🎉 Generation completed!`, {
                jobId,
                resultCount: result.length,
                results: result.map((r) => ({
                    type: r.type,
                    hasVideo: !!r.video,
                    hasImage: !!r.image,
                    hasThumbnail: !!r.thumbnail,
                })),
            });
            customToast.success("Generation completed!");
        } else if (status === "failed") {
            console.error(`[PLAYGROUND] ❌ Generation failed:`, {
                jobId,
                error: watcherError,
            });
            customToast.error("Generation failed. Please try again.");
        } else if (status === "pending") {
            console.log(`[PLAYGROUND] ⏳ Generation status: pending`, { jobId });
        }
    }, [status, result, jobId, watcherError]);

    // Show errors
    useEffect(() => {
        if (watcherError) {
            customToast.error(watcherError.message);
        }
    }, [watcherError]);

    // Check if processing (uploading or generating)
    const isProcessing = isUploading || isGenerating || status === "pending";

    // Check if generation is completed
    const isCompleted = status === "completed" && result && result.length > 0;

    // Check if ready to process
    const canProcess = isDualUpload
        ? (uploadedFile && uploadedFile2)
        : uploadedFile;

    // Handle try another image - reset everything
    const handleTryAnother = () => {
        console.log(`[PLAYGROUND] 🔄 Resetting for new generation`);
        // Clear uploaded images using appropriate hook
        if (isDualUpload) {
            dualUpload.clearAll();
        } else {
            singleUpload.clearUpload();
        }
        // Reset generation state
        resetGeneration();
    };

    // Handle download - use hook
    const handleDownload = (item: { video?: string; image?: string; thumbnail?: string; type: "video" | "image" }) => {
        downloadResult(item);
    };

    return (
        <div className="flex flex-col gap-5">
            {/* Title and Description */}
            <div className="flex flex-col text-center items-center gap-5 justify-center mt-15 px-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold px-4">
                    {title}
                </h1>
                <p className="text-gray-500 max-w-xl">{description}</p>
            </div>

            {/* Playground Card */}
            <div className="w-full mt-5 max-w-lg lg:max-w-3xl mx-auto p-0.5 rounded-md m-10 bg-white flex flex-col gap-10">
                {isDualUpload ? (
                    <DualUploadContainer
                        inputId1="file-upload-1"
                        inputId2="file-upload-2"
                        uploadedImage1={uploadedImage}
                        uploadedImage2={uploadedImage2}
                        previewUrl1={transformationPreview}
                        previewUrl2={transformationResult || transformationPreview}
                        label1={toolConfig?.dualUploadLabels?.firstImageLabel || "Upload your image"}
                        label2={toolConfig?.dualUploadLabels?.secondImageLabel || "Upload second image"}
                        helperText="or drag and drop PNG, JPG or WEBP"
                        onFileSelect1={(file) => handleFileUpload(file, false)}
                        onFileSelect2={(file) => handleFileUpload(file, true)}
                    />
                ) : (
                    <UploadContainer
                        inputId="file-upload"
                        uploadedImage={uploadedImage}
                        previewUrl={transformationPreview}
                        resultUrl={transformationResult}
                        isCompleted={!!isCompleted}
                        result={result && result.length > 0 ? result[0] : undefined}
                        uploadLabel="Upload Your Original Image"
                        helperText="or drag and drop PNG, JPG or WEBP"
                        onFileSelect={(file) => handleFileUpload(file, false)}
                        onTryAnother={handleTryAnother}
                        onDownload={handleDownload}
                    />
                )}
            </div>

            {/* Generate Button - Only show when not completed */}
            {!isCompleted && (
                <GenerateButton
                    buttonText={buttonText}
                    creditCost={creditCost}
                    isUploading={isUploading}
                    isGenerating={isGenerating}
                    isPending={status === "pending"}
                    disabled={!canProcess || isProcessing}
                    onClick={handleProcess}
                />
            )}

            {/* Sample Images */}
            <SampleImages
                samples={sampleImages}
                onSampleClick={() => {
                    // Sample image click handler
                    // Note: Sample images are URLs, not Files, so we can't directly use them
                    // This would require fetching the image and converting to File/Blob
                    // For now, this is a placeholder for future implementation
                }}
            />

        </div>
    );
}
