import { ValidationError, ValidationErrors } from '../middlewares/error';
import { ZodError, ZodTypeAny } from 'zod';
export * from 'zod';

export const validationHelper = <D>(data: D, validation: ZodTypeAny): D => {
  try {
    return validation.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw ValidationErrors.fromZodErrorArray(error.issues);
    } else {
      console.log(error);
      throw new ValidationError(
        'unknown',
        'Something went wrong!',
        'Parse data',
        'unknown'
      );
    }
  }
};
