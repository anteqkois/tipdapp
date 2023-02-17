import { ZodIssue } from 'zod';

class ValidationError extends Error {
  type = 'ValidationError';

  field: string;

  title: string;

  message: string;

  code: string;

  status: number;

  isOperational = true;

  constructor(field: string, title: string, message: string, code: string, status?: number) {
    super();
    this.field = field;
    this.title = title;
    this.message = message;
    this.code = code;
    this.status = status ?? 422;
  }

  static fromZodErrorArray(zodErrorArray: ZodIssue[]) {
    const errors: ValidationError[] = [];

    const getField = (error: ZodIssue) => {
      let field;
      let idx = 1;
      while (typeof field !== 'string') {
        field = error.path[error.path.length - idx] as string;
        idx = -1;
      }
      return field;
    };
    zodErrorArray.forEach((zodError) => {
      const errorField = getField(zodError);

      const error = new ValidationError(errorField, errorField, zodError.message, `${zodError.path[0]}.${zodError.code}`);
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

const isValidationError = (object: unknown): object is ValidationError => {
  if (object !== null && typeof object === 'object' && 'type' in object && object.type === 'ValidationError') return true;
  return false;
};

const createValidationError = (message: string, title: string, field: string, code: string, status?: number) => {
  throw new ValidationError(field, title, message, code, status);
};

export { createValidationError, isValidationError, ValidationError };
