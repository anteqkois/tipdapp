import { z } from 'zod';

export const signUpValidation = z.object({
  email: z.string().email(),
  firstName: z.string().min(3, { message: 'First name must have 3 or more characters.' }),
  lastName: z.string().min(3, { message: 'Last name must have 3 or more characters.' }),
  nick: z.string().min(2, { message: 'Nick must have 2 or more characters.' }),
  // address: z.string().length(42, { message: 'Wrong user address' }),
});
