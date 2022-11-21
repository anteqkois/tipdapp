import { z } from 'zod';

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

export const createBody = userTokenFormValidation.extend({
  address: z.string().length(42, { message: 'Wrong token address' }),
  userAddress: z.string().length(42, { message: 'Wrong wallet address' }),
  chainId: z.number({ required_error: 'ChainId is required' }),
  txHash: z.string().length(66, { message: 'Wrong transaction hash' }),
});

const userTokenValidation = { createBody };
export { userTokenValidation };
