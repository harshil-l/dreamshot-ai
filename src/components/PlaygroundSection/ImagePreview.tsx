import Image from "next/image";
import { TransformationArrowIcon } from "../Icons";

interface ImagePreviewProps {
    /** Preview image URL (from JSON config) */
    previewUrl: string;
    /** Optional result image URL (for showing before/after) */
    resultUrl?: string;
    /** Whether to show the transformation arrow between images */
    showArrow?: boolean;
}

/**
 * Reusable image preview component
 * Displays preview image(s) with optional transformation arrow
 */
export function ImagePreview({ previewUrl, resultUrl, showArrow = false }: ImagePreviewProps) {
    if (resultUrl && showArrow) {
        // Show both images with arrow
        return (
            <div className="flex items-center justify-center md:gap-12 mb-10">
                <div className="relative flex items-center justify-center" style={{ minHeight: 160, minWidth: 320 }}>
                    <div className="flex items-center justify-center gap-0 relative" style={{ width: 250 }}>
                        <div className="z-10 shadow-2xl rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300 relative">
                            <Image
                                src={previewUrl}
                                alt="Original Preview"
                                width={125}
                                height={160}
                                className="object-cover w-[125px] h-40"
                            />
                        </div>
                        <div className="z-20 shadow-2xl rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300 relative" style={{ marginLeft: -28 }}>
                            <Image
                                src={resultUrl}
                                alt="Transformed Preview"
                                width={125}
                                height={160}
                                className="object-cover w-[125px] h-40"
                            />
                        </div>
                        <div className="absolute z-30 left-[46%] -translate-x-1/2 top-[60%]">
                            <TransformationArrowIcon />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Show single preview image
    return (
        <div className="flex items-center justify-center md:gap-12 mb-10">
            <div className="relative flex items-center justify-center" style={{ minHeight: 160, minWidth: 320 }}>
                <div className="shadow-2xl rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300">
                    <Image
                        src={previewUrl}
                        alt="Preview"
                        width={200}
                        height={250}
                        className="object-cover rounded-xl"
                    />
                </div>
            </div>
        </div>
    );
}

