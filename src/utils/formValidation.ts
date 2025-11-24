/**
 * Form validation utilities
 * Provides reusable validation functions for forms
 */

/**
 * Validates email format
 * @param email - Email string to validate
 * @returns Object with isValid boolean and error message if invalid
 */
export function validateEmail(email: string): { isValid: boolean; error?: string } {
    if (!email || email.trim() === "") {
        return {
            isValid: false,
            error: "Email is required",
        };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            isValid: false,
            error: "Please enter a valid email address",
        };
    }

    return { isValid: true };
}

/**
 * Validates password
 * @param password - Password string to validate
 * @param minLength - Minimum password length (default: 8)
 * @returns Object with isValid boolean and error message if invalid
 */
export function validatePassword(
    password: string,
    minLength: number = 8
): { isValid: boolean; error?: string } {
    if (!password || password.trim() === "") {
        return {
            isValid: false,
            error: "Password is required",
        };
    }

    if (password.length < minLength) {
        return {
            isValid: false,
            error: `Password must be at least ${minLength} characters`,
        };
    }

    return { isValid: true };
}

/**
 * Validates that two passwords match
 * @param password - First password
 * @param confirmPassword - Second password to compare
 * @returns Object with isValid boolean and error message if invalid
 */
export function validatePasswordMatch(
    password: string,
    confirmPassword: string
): { isValid: boolean; error?: string } {
    if (password !== confirmPassword) {
        return {
            isValid: false,
            error: "Passwords do not match",
        };
    }

    return { isValid: true };
}

/**
 * Validates required field
 * @param value - Value to validate
 * @param fieldName - Name of the field (for error message)
 * @returns Object with isValid boolean and error message if invalid
 */
export function validateRequired(
    value: string | number | null | undefined,
    fieldName: string = "Field"
): { isValid: boolean; error?: string } {
    if (value === null || value === undefined || (typeof value === "string" && value.trim() === "")) {
        return {
            isValid: false,
            error: `${fieldName} is required`,
        };
    }

    return { isValid: true };
}

/**
 * Validates a form field based on type
 * @param type - Type of validation to perform
 * @param value - Value to validate
 * @param options - Additional options (minLength for password, fieldName for required, etc.)
 * @returns Object with isValid boolean and error message if invalid
 */
export function validateField(
    type: "email" | "password" | "required",
    value: string,
    options?: {
        minLength?: number;
        fieldName?: string;
        confirmPassword?: string;
    }
): { isValid: boolean; error?: string } {
    switch (type) {
        case "email":
            return validateEmail(value);
        case "password":
            return validatePassword(value, options?.minLength);
        case "required":
            return validateRequired(value, options?.fieldName);
        default:
            return { isValid: true };
    }
}

/**
 * Validates multiple fields at once
 * @param validations - Array of validation results
 * @returns Object with isValid boolean and errors array
 */
export function validateMultiple(
    validations: Array<{ isValid: boolean; error?: string }>
): { isValid: boolean; errors: string[] } {
    const errors = validations
        .filter((v) => !v.isValid)
        .map((v) => v.error)
        .filter((error): error is string => !!error);

    return {
        isValid: errors.length === 0,
        errors,
    };
}

