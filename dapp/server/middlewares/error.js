import { ZodError } from 'zod';

export const notFound = (req, res, next) => {
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
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.message = message;
    this.isOperational = true;
    // Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError {
  field;
  constructor(field, title, message, code) {
    // this.placement = placement;
    // this.location = location;
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
    this.name = 'ValidationErrors';
    // pass array of ValidationError
    this.errors = errors;
    this.status = status;
    this.detail = detail;
    this.isOperational = true;
  }

  fromZodErrorArray(zodErrorArray, status) {
    // console.log('zodErrorArray', zodErrorArray);
    // console.table('zodErrorArray', zodErrorArray);
    // console.log('typeof', typeof zodErrorArray);

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

export const createValidationError = (errors, status, detail) => {
  throw new ValidationErrors(errors, status, detail);
};

export const createApiError = (message, status) => {
  throw new ApiError(message, status);
};

export const handleErrors = (err, req, res, next) => {
  console.log(err);
  console.table(err);
  if (err instanceof ApiError) {
    return res.status(err.status || 500).json(err);
  }
  if (err instanceof ValidationErrors) {
    return res.status(err.status || 500).json({ errors: err.errors });
  }
  if (err instanceof ZodError) {
    return new ValidationErrors().fromZodErrorArray(err.issues);
  }
  return res.status(err.status || 500).json(err?.message);
  // next();
};

// export { notFound };
// export { createApiError };
// export { createValidationError };
// export { catchErrors };
// export { catchAsyncErrors };
// export { ApiError };
// export  ValidationError ;
// export { handleErrors };
export default {
  notFound,
  createApiError,
  createValidationError,
  catchErrors,
  catchAsyncErrors,
  ApiError,
  ValidationError,
  handleErrors,
};
