import { ZodError } from 'zod';
import { errorLogger, requestLogger } from '../config/logger.js';

export const notFound = (req, res, next) => {
  requestLogger.error('not found', { url: req.url, method: req.method, host: req.hostname });
  const err = new Error('404 api endpoint not found');
  err.status = 404;
  next(err);
};

export const catchAsyncErrors = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export const catchErrors = (handler) => {
  return (req, res, next) => {
    try {
      handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export class ApiError extends Error {
  constructor(message, status) {
    super();
    this.type = 'ApiError';
    this.status = status;
    this.message = message;
    // this.isOperational = true;
    // Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError {
  constructor(field, title, message, code) {
    this.type = 'ValidationError';
    this.field = field;
    this.title = title;
    this.message = message;
    this.code = code;
  }
  // fromZodError(zodErrorArray) {
  //   this.field = zodObject.path[0];
  //   this.title = zodObject.path[0];
  //   this.userMessage = zodObject.message;
  //   this.code = `${zodObject.path[0]}.${zodObject.code}`;
  // }
}

export class ValidationErrors extends Error {
  constructor(errors = [], status = 400, detail) {
    super();
    // this.name = 'ValidationErrors';
    // pass array of ValidationError
    this.errors = errors;
    // this.status = status;
    // this.detail = detail;
    // this.isOperational = true;
  }

  fromZodErrorArray(zodErrorArray, status) {
    zodErrorArray.forEach((zodError) => {
      const error = new ValidationError(
        zodError.path[0],
        zodError.path[0],
        zodError.message,
        `${zodError.path[0]}.${zodError.code}`,
      );

      this.errors.push(error);
    });

    return this;
  }
}

// Add type erros as ValidationError
export const createValidationErrors = (errors, status, detail) => {
  throw new ValidationErrors(errors, status, detail);
};
// export const createValidationErrors = (errors, status, detail) => {
//   throw new ValidationErrors(errors, status, detail);
// };

export const createValidationError = (message, title, field, code) => {
  throw new ValidationError(field, title, message, code);
};

export const createApiError = (message, status) => {
  throw new ApiError(message, status);
};

//If operational throw away and handle in handelErrors middleware, other way create ApiError with given message
export const isOperational = (err, helpMessage) => {
  if (err instanceof ApiError || err instanceof ValidationError || err instanceof ValidationErrors || err instanceof ZodError) {
    throw err;
    // return true;
  } else if (helpMessage) {
    console.log(err);
    createApiError(helpMessage);
  }
  errorLogger.error('no operational', err);
  throw err;
  // return false;
};

export const handleErrors = (err, req, res, next) => {
  if (err instanceof ApiError || err instanceof ValidationError) {
    errorLogger.error('', err);
    return res.status(err.status || 500).send({ error: [err] });
  }
  if (err instanceof ValidationErrors) {
    errorLogger.error('ValidationErrors', err.errors);
    return res.status(err.status || 500).json({ error: err.errors });
  }
  if (err instanceof ZodError) {
    errorLogger.error('ZodError', new ValidationErrors().fromZodErrorArray(err.issues).errors);
    return res.status(err.status || 500).json({ error: new ValidationErrors().fromZodErrorArray(err.issues).errors });
  }
  errorLogger.error('no operational', err);
  return res.status(err.status || 500).json(err.message || 'Something went wrong, try later.');
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
