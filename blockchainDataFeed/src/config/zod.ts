import { ApiError, ValidationError } from '@tipdapp/server';
import { ZodError, ZodTypeAny } from 'zod';
export * from 'zod';

export const validationHelper = <D>(data: D, validation: ZodTypeAny): D => {
  try {
    return validation.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw ValidationError.fromZodErrorArray(error.issues);
    } else {
      throw new ApiError('Validation error');
    }
  }
};
