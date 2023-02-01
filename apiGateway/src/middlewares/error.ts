import { ZodIssue } from '../config/zod';

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

export const isApiError = (object: unknown): object is ApiError => {
  if (
    object !== null &&
    typeof object === 'object' &&
    'type' in object &&
    object.type === 'ApiError'
  )
    return true;
  return false;
};

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

    return errors;
  }

  static mapArrayByField(errorArray: ValidationError[]) {
    const mapedError: Record<string, string> = {};
    errorArray.forEach((err) => {
      mapedError[err.field] = err.message;
    });
    return mapedError;
  }
}

export const isValidationError = (
  object: unknown
): object is ValidationError => {
  if (
    object !== null &&
    typeof object === 'object' &&
    'type' in object &&
    object.type === 'ValidationError'
  )
    return true;
  return false;
};

export const createValidationError = (
  message: string,
  title: string,
  field: string,
  code: string,
  status?: number
) => {
  throw new ValidationError(field, title, message, code, status);
};

export const createApiError = (message: string, status?: number) => {
  throw new ApiError(message, status);
};

export const isOperationalErrorArray = (
  arr: unknown[]
): arr is (ApiError | ValidationError)[] => {
  if (
    arr[0] !== null &&
    typeof arr[0] === 'object' &&
    'isOperational' in arr[0] &&
    arr[0].isOperational
  )
    return true;
  return false;
};
