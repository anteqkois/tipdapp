import { ApiError } from '@tipdapp/server';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new ApiError('Api endpoint not found', StatusCodes.NOT_FOUND);
  next(err);
};

export const catchAsyncErrors = (handler: (req: Request<any, any, any, any>, res: Response, next: NextFunction) => void) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export const handleErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.type === 'ApiError') {
    return res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).send({ error: [err] });
  }
  // if (isOperationalErrorArray(err)) {
  //   errorLogger.error('Error array', err);
  //   return res
  //     .status(err[0].status || StatusCodes.INTERNAL_SERVER_ERROR)
  //     .json({ error: err });
  // }
  // if (err instanceof ZodError) {
  //   const error = ValidationError.fromZodErrorArray(err.issues);
  //   errorLogger.error('ZodError', error);
  //   return res.status(422).json({
  //     error,
  //   });
  // }

  return res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: [new ApiError('Something went wrong on server, try later.')],
  });
};
