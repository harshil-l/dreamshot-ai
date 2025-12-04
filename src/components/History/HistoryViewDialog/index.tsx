"use client";

import { useAtom } from "jotai";
import Image from "next/image";
import { X } from "lucide-react";
import { DialogBase } from "@/components/DialogBase";
import { dialogAtom } from "@/atoms/dialogAtom";
import { historyViewAtom } from "@/atoms/historyViewAtom";
import { useHandleDialogType } from "@/hooks/useHandleDialogType";

/**
 * Dialog component to display full-size image or video from history
 * Shows the complete media in a large viewable format
 * Close button is positioned on top of the image/video
 */
export default function HistoryViewDialog() {
    const [dialog] = useAtom(dialogAtom);
    const [generation] = useAtom(historyViewAtom);
    const { handleDialogType } = useHandleDialogType();
    const isOpen = dialog.includes("historyView");

    if (!isOpen || !generation) return null;

    const result = generation.result?.[0];
    const isVideo = generation.generationType === "video";
    const mediaUrl = isVideo ? result?.video : result?.image;
    const thumbnailUrl = result?.thumbnail;

    // Use media URL, fallback to thumbnail
    const displayUrl = mediaUrl || thumbnailUrl || "";

    const handleClose = () => {
        handleDialogType("historyView", "remove");
    };

    return (
        <DialogBase
            name="historyView"
            title={`View ${isVideo ? "Video" : "Image"} Generation`}
            className="!max-w-[85vw] !sm:max-w-[75vw] !md:max-w-[65vw] !lg:max-w-[50vw] w-auto h-auto !max-h-[70vh] !sm:max-h-[65vh] !md:max-h-[60vh] !rounded-lg !p-0"
            hideHeader={true}
            removeCloseButton={true}
            disableClose={false}
            isPaddingAroundRemoved={true}
            pClass="!p-0"
        >
            <div className="relative w-full h-full">
                {/* Close button positioned on top of image/video */}
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all hover:scale-110"
                    aria-label="Close"
                >
                    <X className="w-4 h-4 text-gray-800" />
                </button>

                {displayUrl ? (
                    isVideo ? (
                        <video
                            src={displayUrl}
                            className="w-full h-full max-h-[70vh] sm:max-h-[65vh] md:max-h-[60vh] object-contain block"
                            controls
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    ) : (
                        <Image
                            src={displayUrl}
                            alt="Generated result"
                            width={1920}
                            height={1080}
                            className="w-full h-full max-h-[70vh] sm:max-h-[65vh] md:max-h-[60vh] object-contain block"
                            sizes="50vw"
                            unoptimized
                        />
                    )
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white bg-gray-900 min-h-[200px]">
                        <span>No media available</span>
                    </div>
                )}
            </div>
        </DialogBase>
    );
}

