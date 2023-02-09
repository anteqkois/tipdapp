import { ZodIssue } from '../config/zod';
export declare class ApiError extends Error {
    type: string;
    status: number;
    message: string;
    isOperational: boolean;
    constructor(message: string, status?: number);
}
export declare const isApiError: (object: unknown) => object is ApiError;
export declare class ValidationError extends Error {
    type: string;
    field: string;
    title: string;
    message: string;
    code: string;
    status: number;
    isOperational: boolean;
    constructor(field: string, title: string, message: string, code: string, status?: number);
    static fromZodErrorArray(zodErrorArray: ZodIssue[], status?: number): ValidationError[];
    static mapArrayByField(errorArray: ValidationError[]): Record<string, string>;
}
export declare const isValidationError: (object: unknown) => object is ValidationError;
export declare const createValidationError: (message: string, title: string, field: string, code: string, status?: number) => never;
export declare const createApiError: (message: string, status?: number) => never;
export declare const isOperationalErrorArray: (arr: unknown[]) => arr is (ApiError | ValidationError)[];
