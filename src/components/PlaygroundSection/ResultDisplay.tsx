import Image from "next/image";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

interface GenerationResult {
    video?: string;
    image?: string;
    thumbnail?: string;
    type: "video" | "image";
}

interface ResultDisplayProps {
    /** Generation result to display */
    result: GenerationResult;
    /** Callback when "Try Another Image" is clicked */
    onTryAnother: () => void;
    /** Callback when "Download" is clicked */
    onDownload: (result: GenerationResult) => void;
}

/**
 * Component for displaying generation results with action buttons
 */
export function ResultDisplay({ result, onTryAnother, onDownload }: ResultDisplayProps) {
    return (
        <>
            {/* Result Image/Video */}
            <div className="flex items-center justify-center md:gap-12 mb-10">
                <div className="relative flex items-center justify-center" style={{ minHeight: 160, minWidth: 320 }}>
                    {result.type === "video" ? (
                        <div className="shadow-2xl rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300">
                            <video
                                src={result.video}
                                className="w-full h-auto max-w-md rounded-xl"
                                controls
                                loop
                                muted
                                playsInline
                            />
                        </div>
                    ) : (
                        <div className="shadow-2xl rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300">
                            <Image
                                src={result.image || result.thumbnail || ""}
                                alt="Generated result"
                                width={200}
                                height={250}
                                className="object-cover rounded-xl"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 items-center">
                <div className="flex gap-4">
                    <Button variant="outline" className="px-6 py-2" onClick={onTryAnother}>
                        Try Another Image
                    </Button>
                    <Button
                        variant="dark"
                        className="px-6 py-2 flex items-center gap-2"
                        onClick={() => onDownload(result)}
                    >
                        <Download className="w-4 h-4" />
                        Download
                    </Button>
                </div>
            </div>
        </>
    );
}

