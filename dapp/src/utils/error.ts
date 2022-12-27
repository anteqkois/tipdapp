import { ValidationError, ValidationErrors } from '@tipdapp/server';

export const mapValidationErrors = (err: ValidationError[]) =>
  new ValidationErrors(err).mapByField();
