import { validationHelper, z } from '../config/zod';

const createForm = z.object({
  symbol: z
    .string()
    .min(2, { message: 'Token symbol must have 2 or more characters.' })
    .max(20, { message: 'Token symbol can be up to 10 characters long.' }),
  name: z
    .string()
    .min(1, { message: 'Token name must have 2 or more characters.' })
    .max(20, { message: 'Token name can be up to 20 characters long.' }),
});

const create = createForm.extend({
  address: z.string().length(42, { message: 'Wrong token address' }),
  userAddress: z.string().length(42, { message: 'Wrong wallet address' }),
  chainId: z.number({ required_error: 'ChainId is required' }),
  txHash: z.string().length(66, { message: 'Wrong transaction hash' }),
});

const createFormParse = (data: UserTokenValidation.CreateForm) =>
  validationHelper<UserTokenValidation.CreateForm>(data, createForm);

const createParse = (data: UserTokenValidation.Create) =>
  validationHelper<UserTokenValidation.Create>(data, create);

export namespace UserTokenValidation {
  export type CreateForm = z.infer<typeof createForm>;
  export type Create = z.infer<typeof create>;
}

export const userTokenValidation = {
  // create,
  createParse,
  // createForm,
  createFormParse,
};
