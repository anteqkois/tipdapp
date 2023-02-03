import { validationHelper, z } from '../config/zod';

export const update = z.object({
  // affixUrl: z
  //   .string()
  //   .min(3, 'Url page must have 3 or more characters.')
  //   .max(30, 'Url can be up to 20 characters long.'),
  // .optional(),
  description: z
    .string()
    .min(20, 'Description page must have 20 or more characters.')
    .max(500, 'Description can be up to 200 characters long.'),
  // .optional(),
  tokens: z
    .array(z.string(), {
      required_error: 'At least one token must be selected.',
    })
    .min(1, 'At least one token must be selected.'),
  // banerId: z.string().min(1, { message: 'Wrong file.' }).optional(),
});

const updateParse = (data: PageValidation.Update) =>
  validationHelper<PageValidation.Update>(data, update);

export namespace PageValidation {
  export type Update = z.infer<typeof update>;
}

export const pageValidation = {
  updateParse: updateParse,
};
