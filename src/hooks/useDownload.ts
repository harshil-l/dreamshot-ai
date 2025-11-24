import { useCallback } from "react";
import { downloadFile, downloadGenerationResult } from "@/utils/download";

/**
 * Hook for downloading files
 * Provides convenient download functions for components
 */
export function useDownload() {
    /**
     * Downloads a file from URL
     * @param url - URL of the file to download
     * @param filename - Optional custom filename
     * @param fileType - Type of file ("video" or "image")
     */
    const download = useCallback(
        (url: string, filename?: string, fileType?: "video" | "image") => {
            downloadFile(url, filename, fileType);
        },
        []
    );

    /**
     * Downloads a generation result
     * @param item - Generation result object
     */
    const downloadResult = useCallback(
        (item: { video?: string; image?: string; thumbnail?: string; type: "video" | "image" }) => {
            downloadGenerationResult(item);
        },
        []
    );

    return {
        download,
        downloadResult,
    };
}

