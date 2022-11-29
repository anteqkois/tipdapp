/// <reference types="qs" />
import { NextFunction } from 'express';
import { Request, Response } from 'express-serve-static-core';
import { ZodIssue } from '../config/zod';
export declare const notFound: (req: Request, res: Response, next: NextFunction) => void;
export declare const catchAsyncErrors: (handler: (req: Request<any, any, any, any>, res: Response, next: NextFunction) => void) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const catchErrors: (handler: (req: Request, res: Response, next: NextFunction) => void) => (req: Request, res: Response, next: NextFunction) => void;
export declare class ApiError extends Error {
    type: string;
    status: number;
    message: string;
    isOperational: boolean;
    constructor(message: string, status?: number);
}
export declare class ValidationError extends Error {
    type: string;
    field: string;
    title: string;
    message: string;
    code: string;
    status: number;
    isOperational: boolean;
    constructor(field: string, title: string, message: string, code: string, status?: number);
}
export declare class ValidationErrors extends Error {
    type: string;
    errors: ValidationError[];
    status: number;
    isOperational: boolean;
    constructor(errors: ValidationError[], status?: number);
    static fromZodErrorArray(zodErrorArray: ZodIssue[], status?: number): ValidationErrors;
}
export declare const createValidationErrors: (errors: ValidationError[], status?: number) => never;
export declare const createValidationError: (message: string, title: string, field: string, code: string) => never;
export declare const createApiError: (message: string, status?: number) => never;
export declare const isOperational: (err: any, helpMessage: string) => never;
export declare const handleErrors: (err: any, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>, number>;
declare const _default: {
    notFound: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>, next: NextFunction) => void;
    createApiError: (message: string, status?: number | undefined) => never;
    createValidationErrors: (errors: ValidationError[], status?: number | undefined) => never;
    catchErrors: (handler: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>, next: NextFunction) => void) => (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>, next: NextFunction) => void;
    catchAsyncErrors: (handler: (req: Request<any, any, any, any, Record<string, any>>, res: Response<any, Record<string, any>, number>, next: NextFunction) => void) => (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>, next: NextFunction) => Promise<void>;
    ApiError: typeof ApiError;
    ValidationError: typeof ValidationError;
    handleErrors: (err: any, req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>, next: NextFunction) => Response<any, Record<string, any>, number>;
};
export default _default;
