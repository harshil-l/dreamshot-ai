import Image from "next/image";
import { ImagePreview } from "./ImagePreview";

interface DualUploadContainerProps {
    /** First input element ID */
    inputId1: string;
    /** Second input element ID */
    inputId2: string;
    /** First uploaded image preview URL */
    uploadedImage1: string | null;
    /** Second uploaded image preview URL */
    uploadedImage2: string | null;
    /** Default preview image URL for first container */
    previewUrl1: string;
    /** Default preview image URL for second container */
    previewUrl2: string;
    /** First upload label */
    label1: string;
    /** Second upload label */
    label2: string;
    /** Helper text */
    helperText: string;
    /** Callback when first file is selected */
    onFileSelect1: (file: File) => void;
    /** Callback when second file is selected */
    onFileSelect2: (file: File) => void;
}

/**
 * Dual upload container component
 * Handles two file uploads side by side
 */
export function DualUploadContainer({
    inputId1,
    inputId2,
    uploadedImage1,
    uploadedImage2,
    previewUrl1,
    previewUrl2,
    label1,
    label2,
    helperText,
    onFileSelect1,
    onFileSelect2,
}: DualUploadContainerProps) {
    const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect1(file);
        }
    };

    const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect2(file);
        }
    };

    return (
        <div className="w-full flex flex-col md:flex-row gap-6">
            {/* First Container */}
            <div className="flex-1 border-3 m-2 border-dashed border-gray-300 rounded-md p-10 flex flex-col items-center justify-center bg-gray-50/50 min-h-[400px]">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange1}
                    className="hidden"
                    id={inputId1}
                />

                {/* Images Container */}
                {uploadedImage1 ? (
                    <div className="flex items-center justify-center md:gap-12 mb-10">
                        <div className="relative flex items-center justify-center" style={{ minHeight: 160, minWidth: 320 }}>
                            <div className="shadow-2xl rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300">
                                <Image
                                    src={uploadedImage1}
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
                    <ImagePreview previewUrl={previewUrl1} />
                )}

                {/* Upload Text */}
                <div className="text-center space-y-3">
                    <label htmlFor={inputId1} className="cursor-pointer">
                        <p className="text-xl md:text-2xl text-gray-900">
                            {uploadedImage1 ? "Image Uploaded" : label1}
                        </p>
                        <p className="text-sm md:text-base text-gray-400">
                            {uploadedImage1 ? "Click to change" : helperText}
                        </p>
                    </label>
                </div>
            </div>

            {/* Second Container */}
            <div className="flex-1 border-3 m-2 border-dashed border-gray-300 rounded-md p-10 flex flex-col items-center justify-center bg-gray-50/50 min-h-[400px]">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange2}
                    className="hidden"
                    id={inputId2}
                />

                {/* Images Container */}
                {uploadedImage2 ? (
                    <div className="flex items-center justify-center md:gap-12 mb-10">
                        <div className="relative flex items-center justify-center" style={{ minHeight: 160, minWidth: 320 }}>
                            <div className="shadow-2xl rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300">
                                <Image
                                    src={uploadedImage2}
                                    alt="Uploaded 2"
                                    width={200}
                                    height={250}
                                    className="object-cover rounded-xl"
                                    unoptimized
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <ImagePreview previewUrl={previewUrl2 || previewUrl1} />
                )}

                {/* Upload Text */}
                <div className="text-center space-y-3">
                    <label htmlFor={inputId2} className="cursor-pointer">
                        <p className="text-xl md:text-2xl text-gray-900">
                            {uploadedImage2 ? "Image Uploaded" : label2}
                        </p>
                        <p className="text-sm md:text-base text-gray-400">
                            {uploadedImage2 ? "Click to change" : helperText}
                        </p>
                    </label>
                </div>
            </div>
        </div>
    );
}

