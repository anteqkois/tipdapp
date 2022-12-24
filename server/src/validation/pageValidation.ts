import { validationHelper, z } from '../config/zod';

const update = z.object({
  affixUrl: z
    .string()
    .min(3, { message: 'Url page must have 3 or more characters.' })
    .max(30, { message: 'Url can be up to 20 characters long.' }),
    // .optional(),
  description: z
    .string()
    .min(20, { message: 'Description page must have 20 or more characters.' })
    .max(200, { message: 'Url can be up to 200 characters long.' }),
    // .optional(),
  banerId: z.string().min(1, { message: 'Wrong file.' }).optional(),
});

const updateParse = (data: PageValidation.Update) =>
  validationHelper<PageValidation.Update>(data, update);

export namespace PageValidation {
  export type Update = z.infer<typeof update>;
}

export const pageValidation = {
  updateParse: updateParse,
};