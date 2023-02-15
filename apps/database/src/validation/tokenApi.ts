import { Token } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from '../config/zod';
// import { transformApiInclude } from './utils';

// const pageInclude = z
//   .array(z.union([z.literal('baner'), z.literal('streamer')]))
//   .transform((include) => transformApiInclude(include));

const find = z.object({
  query: z.object({
    chainId: z.number().optional(),
    symbol: z.string().optional(),
    name: z.string().optional(),
    // include: pageInclude,
  }),
});

export namespace TokenApi {
  export namespace Find {
    const requestShape = find.shape;
    export type Query = z.input<typeof requestShape.query>;
    export type ResBody = { tokens: Token[] };
    export type Req = Request<any, any, any, Query>;
    export type Res = Response<ResBody>;
  }
}

export const tokenApi = {
  find,
};
