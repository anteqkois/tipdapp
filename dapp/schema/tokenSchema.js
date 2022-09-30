import { z } from 'zod';

export const tokenSchemaForm = z.object({
  tokenSymbol: z
    .string()
    .min(2, { message: 'Token symbol must have 2 or more characters.' })
    .max(20, { message: 'Token symbol can be up to 10 characters long.' }),
  tokenName: z
    .string()
    .min(1, { message: 'Token name must have 2 or more characters.' })
    .max(20, { message: 'Token name can be up to 20 characters long.' }),
});

export const tokenSchema = tokenSchemaForm.extend({
  address: z.string().length(42, { message: 'Wrong token address' }),
  User: z.string().length(42, { message: 'Wrong wallet address' }),
  chainId: z.number({ message: 'Wrong chainId' }),
});
