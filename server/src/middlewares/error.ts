import { NextFunction } from 'express';
import { Request, Response } from 'express-serve-static-core';
import { errorLogger, requestLogger } from '../config/logger';
import { ZodError, ZodIssue } from '../config/zod';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  requestLogger.error('not found', {
    url: req.url,
    method: req.method,
    host: req.hostname,
  });
  const err = new ApiError('Api endpoint not found', 404);
  err.status = 404;
  next(err);
};

export const catchAsyncErrors = (
  handler: (
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction
  ) => void
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export const catchErrors = (
  handler: (req: Request, res: Response, next: NextFunction) => void
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export class ApiError extends Error {
  type: string = 'ApiError';
  status: number;
  message: string;
  isOperational: boolean = true;

  constructor(message: string, status?: number) {
    super();
    this.status = status ?? 400;
    this.message = message;
    // Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends Error {
  type: string = 'ValidationError';
  field: string;
  title: string;
  message: string;
  code: string;
  status: number;
  isOperational: boolean = true;

  constructor(
    field: string,
    title: string,
    message: string,
    code: string,
    status?: number
  ) {
    super();
    this.field = field;
    this.title = title;
    this.message = message;
    this.code = code;
    this.status = status ?? 422;
  }
}

export class ValidationErrors extends Error {
  type: string = 'ValidationErrors';
  errors: ValidationError[];
  status: number;
  isOperational: boolean = true;
  constructor(errors: ValidationError[], status?: number) {
    super();
    // pass array of ValidationError
    this.errors = errors;
    this.status = status ?? 422;
    // this.detail = detail;
    // this.isOperational = true;
  }

  // constructor(zodErrorArray: ZodIssue[], status?: number) {
  //   zodErrorArray.forEach((zodError) => {
  //     const error = new ValidationError(
  //       zodError.path[0] as string,
  //       zodError.path[0] as string,
  //       zodError.message,
  //       `${zodError.path[0]}.${zodError.code}`
  //     );
  //     this.errors.push(error);
  //     this.status = status ?? 500;
  //   });
  //   return this;
  // }

  //TODO! refactor to overload contructor
  static fromZodErrorArray(zodErrorArray: ZodIssue[], status?: number) {
    const errors: ValidationError[] = [];
    zodErrorArray.forEach((zodError) => {
      const error = new ValidationError(
        zodError.path[0] as string,
        zodError.path[0] as string,
        zodError.message,
        `${zodError.path[0]}.${zodError.code}`
      );
      errors.push(error);
    });

    return new this(errors, status);
  }
}

export const createValidationErrors = (
  errors: ValidationError[],
  status?: number
) => {
  throw new ValidationErrors(errors, status);
};

export const createValidationError = (
  message: string,
  title: string,
  field: string,
  code: string
) => {
  throw new ValidationError(field, title, message, code);
};

export const createApiError = (message: string, status?: number) => {
  throw new ApiError(message, status);
};

//If  error is operational throw away and handle in handelErrors middleware, other way create ApiError with given message
export const isOperational = (err: any, helpMessage: string) => {
  if (
    err?.isOperational ||
    err instanceof ZodError
  ) {
    throw err;
  } else if (helpMessage) {
    console.log(err);
    createApiError(helpMessage);
  }
  errorLogger.error('no operational', err);
  throw err;
  // return false;
};

export const handleErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.type === 'ApiError' || err.type === 'ValidationError') {
    errorLogger.error('', err);
    return res.status(err.status || 500).send({ error: [err] });
  }
  if (err.type === 'ValidationErrors') {
    errorLogger.error('ValidationErrors', err.errors);
    return res.status(err.status || 500).json({ error: err.errors });
  }
  if (err instanceof ZodError) {
    errorLogger.error(
      'ZodError',
      ValidationErrors.fromZodErrorArray(err.issues).errors
    );
    return res.status(422).json({
      error: ValidationErrors.fromZodErrorArray(err.issues).errors,
    });
  }
  errorLogger.error('no operational', err);
  return res
    .status(err.status || 500)
    .json(err.message || 'Something went wrong, try later.');
};

export default {
  notFound,
  createApiError,
  createValidationErrors,
  catchErrors,
  catchAsyncErrors,
  ApiError,
  ValidationError,
  handleErrors,
};
