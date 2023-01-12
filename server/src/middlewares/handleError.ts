import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { errorLogger, requestLogger } from '../config/logger';
import { ZodError } from '../config/zod';
import {
  ApiError,
  createApiError,
  ValidationError,
  ValidationErrors,
} from './error';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  requestLogger.error('not found', {
    url: req.url,
    method: req.method,
    host: req.hostname,
  });
  const err = new ApiError('Api endpoint not found', StatusCodes.NOT_FOUND);
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

export const isOperationalErrorArray = (
  arr: Error[]
): arr is (ApiError | ValidationError)[] => {
  if ('isOperational' in arr[0] && arr[0].isOperational === true) return true;
  return false;
};

//If  error is operational throw away and handle in handelErrors middleware, other way create ApiError with given message
export const throwIfOperational = (
  err: any,
  helpMessage: string
  // errorTypeToThrow: 'ApiError' | 'ValidationError'
) => {
  //! TODO handle Siwe Error
  //   {
  //    success: false,
  //    data: SiweMessage {
  //      domain: 'localhost:3000',
  //      address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  //      statement: 'Sign up with Ethereum to the app.',
  //      uri: 'http://localhost:3000',
  //      version: '1',
  //      chainId: 31337,
  //      nonce: 'KHsLMZbr9x3KSiIgZ',
  //      issuedAt: '2022-12-09T07:25:00.239Z'
  //    },
  //    error: SiweError {
  //      type: 'Signature does not match address of the message.',
  //      expected: '0x79fF60f8b96b9eC7a2fc5Cf1f434354472e41eDd',
  //      received: 'Resolved address to be 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
  //    }
  //  }
  if (err?.isOperational || err instanceof ZodError) {
    throw err;
  } else if (helpMessage) {
    console.log(err);
    createApiError(helpMessage);
    // switch (errorTypeToThrow) {
    //   case 'ValidationError':
    //     createValidationError(helpMessage);
    //     break;

    //   default:
    //     createApiError(helpMessage);
    //     break;
    // }
  }
  errorLogger.error('no operational', err);
  throw err;
  // return false;
};

//! TODO handle message statusMessage method from res object
export const handleErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.type === 'ApiError' || err.type === 'ValidationError') {
    errorLogger.error('', err);
    return res
      .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: [err] });
  }
  // if(err instanceof ValidationErrors){}
  if (err.type === 'ValidationErrors') {
    errorLogger.error('ValidationErrors', err.errors);
    return res
      .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.errors });
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
  return res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: new ApiError(err.message || 'Something went wrong, try later.'),
  });
  // return res
  //   .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
  //   .json(err.message || 'Something went wrong, try later.');
};
