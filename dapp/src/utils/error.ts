import { ValidationError, ValidationErrors } from "@anteqkois/server";

export const mapValidationErrors = (err: ValidationError[])=> new ValidationErrors(err).mapByField()