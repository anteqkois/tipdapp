import { NextFunction, Request, Response } from 'express';
import { errorLogger, requestLogger } from '../config/logger';
import { ZodError } from '../config/zod';
import { ApiError, createApiError, ValidationErrors } from './error';

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

//If  error is operational throw away and handle in handelErrors middleware, other way create ApiError with given message
export const isOperational = (err: any, helpMessage: string) => {
  if (err?.isOperational || err instanceof ZodError) {
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
  // if(err instanceof ValidationErrors){}
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
