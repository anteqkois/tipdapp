import { ZodError } from 'zod';
export * from 'zod';
export var validationHelper = function (data, validation) {
    var errors = {};
    try {
        validation.parse(data);
    }
    catch (error) {
        if (error instanceof ZodError) {
            error.issues.forEach(function (zodError) {
                errors[zodError.path[0]] = zodError.message;
            });
        }
        else {
            console.log(error);
        }
    }
    return errors;
};
