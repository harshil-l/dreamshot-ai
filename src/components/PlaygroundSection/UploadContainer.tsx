import Image from "next/image";
import { ImagePreview } from "./ImagePreview";
import { ResultDisplay } from "./ResultDisplay";

interface GenerationResult {
    video?: string;
    image?: string;
    thumbnail?: string;
    type: "video" | "image";
}

interface UploadContainerProps {
    /** Input element ID for file upload */
    inputId: string;
    /** Uploaded image preview URL */
    uploadedImage: string | null;
    /** Default preview image URL from config */
    previewUrl: string;
    /** Optional result image URL from config */
    resultUrl?: string;
    /** Whether generation is completed */
    isCompleted: boolean;
    /** Generation result (if completed) */
    result?: GenerationResult;
    /** Upload label text */
    uploadLabel: string;
    /** Helper text */
    helperText: string;
    /** Callback when file is selected */
    onFileSelect: (file: File) => void;
    /** Callback when "Try Another Image" is clicked */
    onTryAnother?: () => void;
    /** Callback when "Download" is clicked */
    onDownload?: (result: GenerationResult) => void;
}

/**
 * Single upload container component
 * Handles file upload UI and displays preview or result
 */
export function UploadContainer({
    inputId,
    uploadedImage,
    previewUrl,
    resultUrl,
    isCompleted,
    result,
    uploadLabel,
    helperText,
    onFileSelect,
    onTryAnother,
    onDownload,
}: UploadContainerProps) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    return (
        <div className="border-3 m-2 border-dashed border-gray-300 rounded-md p-10 flex flex-col items-center justify-center bg-gray-50/50 min-h-[400px]">
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id={inputId}
            />

            {/* Images Container */}
            {isCompleted && result ? (
                // Show result when generation is complete
                <ResultDisplay
                    result={result}
                    onTryAnother={onTryAnother || (() => {})}
                    onDownload={onDownload || (() => {})}
                />
            ) : uploadedImage ? (
                // Show uploaded image
                <div className="flex items-center justify-center md:gap-12 mb-10">
                    <div className="relative flex items-center justify-center" style={{ minHeight: 160, minWidth: 320 }}>
                        <div className="shadow-2xl rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300">
                            <Image
                                src={uploadedImage}
                                alt="Uploaded"
                                width={200}
                                height={250}
                                className="object-cover rounded-xl"
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            ) : (
                // Show default preview
                <ImagePreview
                    previewUrl={previewUrl}
                    resultUrl={resultUrl}
                    showArrow={!!resultUrl}
                />
            )}

            {/* Upload Text or Action Buttons */}
            {!isCompleted && (
                <div className="text-center space-y-3">
                    <label htmlFor={inputId} className="cursor-pointer">
                        <p className="text-xl md:text-2xl text-gray-900">
                            {uploadedImage ? "Image Uploaded" : uploadLabel}
                        </p>
                        <p className="text-sm md:text-base text-gray-400">
                            {uploadedImage ? "Click to change" : helperText}
                        </p>
                    </label>
                </div>
            )}
        </div>
    );
}

