/**
 * Generates a data URL preview from a File object
 * @param file - The file to generate preview for
 * @returns Promise resolving to data URL string
 */
export function generateImagePreview(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const result = e.target?.result;
            if (typeof result === "string") {
                resolve(result);
            } else {
                reject(new Error("Failed to generate image preview"));
            }
        };
        
        reader.onerror = () => {
            reject(new Error("Error reading file"));
        };
        
        reader.readAsDataURL(file);
    });
}

