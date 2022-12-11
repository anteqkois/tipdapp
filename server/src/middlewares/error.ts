import { number, ZodIssue } from '../config/zod';

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

  mapByField() {
    const mapedError: Record<string, string> = {};
    this.errors.forEach((err) => {
      mapedError[err.field] = err.message;
    });
    return mapedError;
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
  code: string,
  status?: number,
) => {
  throw new ValidationError(field, title, message, code, status);
};

export const createApiError = (message: string, status?: number) => {
  throw new ApiError(message, status);
};

// export default {
//   createApiError,
//   createValidationErrors,
//   ApiError,
//   ValidationError,
// };
