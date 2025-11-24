/**
 * Validates file type
 * @param file - File to validate
 * @param allowedTypes - Array of allowed MIME types (e.g., ["image/jpeg", "image/png"])
 * @returns True if file type is allowed
 */
export function validateFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.includes(file.type);
}

/**
 * Validates file size
 * @param file - File to validate
 * @param maxSizeBytes - Maximum file size in bytes
 * @returns Object with isValid boolean and error message if invalid
 */
export function validateFileSize(
    file: File,
    maxSizeBytes: number
): { isValid: boolean; error?: string } {
    if (file.size > maxSizeBytes) {
        const maxSizeMB = (maxSizeBytes / (1024 * 1024)).toFixed(2);
        return {
            isValid: false,
            error: `File size exceeds ${maxSizeMB}MB`,
        };
    }
    return { isValid: true };
}

/**
 * Validates image file (type and size)
 * @param file - File to validate
 * @param maxSizeBytes - Maximum file size in bytes (default: 10MB)
 * @returns Object with isValid boolean and error message if invalid
 */
export function validateImageFile(
    file: File,
    maxSizeBytes: number = 10 * 1024 * 1024 // 10MB default
): { isValid: boolean; error?: string } {
    // Validate file type
    const allowedImageTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/gif",
    ];

    if (!validateFileType(file, allowedImageTypes)) {
        return {
            isValid: false,
            error: "Invalid file type. Please upload an image (JPG, PNG, WEBP, or GIF)",
        };
    }

    // Validate file size
    const sizeValidation = validateFileSize(file, maxSizeBytes);
    if (!sizeValidation.isValid) {
        return sizeValidation;
    }

    return { isValid: true };
}

