import { validationHelper, z } from '@/lib/zod';

export const userTokenFormValidation = z.object({
  symbol: z
    .string()
    .min(2, { message: 'Token symbol must have 2 or more characters.' })
    .max(20, { message: 'Token symbol can be up to 10 characters long.' }),
  name: z
    .string()
    .min(1, { message: 'Token name must have 2 or more characters.' })
    .max(20, { message: 'Token name can be up to 20 characters long.' }),
});

export const userTokenValidation = userTokenFormValidation.extend({
  address: z.string().length(42, { message: 'Wrong token address' }),
  user: z.string().length(42, { message: 'Wrong wallet address' }),
  chainId: z.number({ required_error: 'ChainId is required' }),
  txHash: z.string().length(66, { message: 'Wrong transaction hash' }),
});

export type UserTokenFormObject = z.infer<typeof userTokenFormValidation>;
export type UserTokenObject = z.infer<typeof userTokenValidation>;

export const userTokenFormParse = (data: UserTokenFormObject) =>
  validationHelper<UserTokenFormObject>(data, userTokenFormValidation);

export const userTokenParse = (data: UserTokenObject) =>
  validationHelper<UserTokenObject>(data, userTokenValidation);
