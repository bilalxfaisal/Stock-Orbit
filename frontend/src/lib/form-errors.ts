import type { ZodError } from "zod";

export function flattenZodErrors(error: ZodError): Record<string, string> {
    const fieldErrors: Record<string, string> = {};

    for (const issue of error.issues) {
        const key = issue.path[0]?.toString();

        if (key && !fieldErrors[key]) {
            fieldErrors[key] = issue.message;
        }
    }

    return fieldErrors;
}

// Pulls a human-readable message out of an axios error, falling back
// to a generic one when the backend didn't send a message.
export function getApiErrorMessage(error: unknown, fallback: string): string {
    const message = (error as { response?: { data?: { message?: string | string[] } } })
        ?.response?.data?.message;

    if (Array.isArray(message)) {
        return message[0] ?? fallback;
    }

    return message ?? fallback;
}
