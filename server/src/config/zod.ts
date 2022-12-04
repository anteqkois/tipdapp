// import { createValidationError, ValidationErrors } from '../middlewares/error';
// import {
//   createValidationError,
//   ValidationError,
//   ValidationErrors,
// } from '@middlewares/error';
import { ZodError, ZodTypeAny } from 'zod';
export * from 'zod';


export const validationHelper = <D>(data: D, validation: ZodTypeAny): D => {
  // const errors: ValidationError[] = [];
  // let errors: ValidationErrors = {} as ValidationErrors;
  let errors: any= {};

  try {
    return validation.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      errors = {};
      // errors = ValidationErrors.fromZodErrorArray(error.issues);
      // errors.concat(ValidationErrors.fromZodErrorArray(error.issues).errors);
      // error.issues.forEach((zodError: ZodIssue) => {
      //   errors[zodError.path[0]] = zodError.message;
      // });
    } else {
      // createValidationError(
      //   'Something went wrong!',
      //   'Parse data',
      //   'unknown',
      //   'unknown'
      // );
      console.log(error);
    }
  }

  throw errors;
};
