import { ZodError, ZodTypeAny } from 'zod';
import { ValidationError } from '../middlewares/error';
export * from 'zod';

export const validationHelper = <D>(data: D, validation: ZodTypeAny): D => {
  try {
    return validation.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw ValidationError.fromZodErrorArray(error.issues);
    } else {
      // TODO! add error logger
      // console.log(error);
      throw new ValidationError(
        'unknown',
        'Something went wrong!',
        'Parse data',
        'unknown'
      );
    }
  }
};
