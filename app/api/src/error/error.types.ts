export interface ErrorResponse {
    success: false;
    error: {
        message: string;
        code?: string;
        statusCode: number;
        errors?: Record<string, string[]>; 
        stack?: string; // Only in development
    };
}