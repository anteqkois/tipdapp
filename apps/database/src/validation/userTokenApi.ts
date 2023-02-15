import { UserToken } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from '../config/zod';

const find = z.object({
  query: z.object({
    address: z.string().optional(),
    symbol: z.string().optional(),
    name: z.string().optional(),
    userAddress: z.string().optional(),
  }),
});

const create = z.object({
  body: z.object({
    symbol: z
      .string()
      .min(2, { message: 'Token symbol must have 2 or more characters.' })
      .max(20, { message: 'Token symbol can be up to 10 characters long.' }),
    name: z
      .string()
      .min(1, { message: 'Token name must have 2 or more characters.' })
      .max(20, { message: 'Token name can be up to 20 characters long.' }),
    address: z.string().length(42, { message: 'Wrong token address' }),
    userAddress: z.string().length(42, { message: 'Wrong wallet address' }),
    chainId: z.number({ required_error: 'ChainId is required' }),
    txHash: z.string().length(66, { message: 'Wrong transaction hash' }),
  }),
});

export namespace UserTokenApi {
  export namespace Create {
    const requestShape = create.shape;
    export type Body = z.infer<typeof requestShape.body>;
    export type ResBody = { token: UserToken };
    export type Req = Request<any, any, Body, any>;
    export type Res = Response<ResBody>;
  }
  export namespace Find {
    const requestShape = find.shape;
    export type Query = z.infer<typeof requestShape.query>;
    export type ResBody = { userToken: UserToken };
    export type Req = Request<any, any, any, Query>;
    export type Res = Response<ResBody>;
  }
}

export const userTokenAPI = {
  find,
  create,
};
