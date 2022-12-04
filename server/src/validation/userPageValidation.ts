import { validationHelper, z } from '../config/zod';

const create = z.object({
  url: z
    .string()
    .min(3, { message: 'Url page must have 3 or more characters.' })
    .max(30, { message: 'Url can be up to 20 characters long.' }),
  description: z
    .string()
    .min(20, { message: 'Description page must have 20 or more characters.' })
    .max(200, { message: 'Url can be up to 200 characters long.' }),
});

const createParse = (data: UserPageValidation.Create) =>
  validationHelper<UserPageValidation.Create>(data, create);

export namespace UserPageValidation {
  export type Create = z.infer<typeof create>;
}

export const userPageValidation = {
  createParse,
};
