import { ApiError, ValidationError } from '@tipdapp/database';
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

// export const parseRequest = <S extends ZodSchema>(requestSchema: S) => {
//   return (req: { params: any; body: any; query: any }) => {
//     const parsedRequest = requestSchema.parse(req);
//     return parsedRequest as z.input<typeof requestSchema>;
//   };
// };
