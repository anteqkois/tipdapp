import { ZodParseErrors } from '@/types';
import { ZodError, ZodIssue, ZodTypeAny } from 'zod';

export const validationHelper = <D>(
  data: D,
  validation: ZodTypeAny
): ZodParseErrors => {
  const errors: ZodParseErrors = {} as ZodParseErrors;

  try {
    validation.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      error.issues.forEach((zodError: ZodIssue) => {
        errors[zodError.path[0]] = zodError.message;
      });
    } else {
      console.log(error);
    }
  }

  return errors;
};
