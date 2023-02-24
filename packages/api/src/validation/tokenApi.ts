import { Token, TokenCoinGecko } from '@tipdapp/types';
import { Request, Response } from 'express';
import { z } from 'zod';
// import { transformApiInclude } from './utils';

// const pageInclude = z
//   .array(z.union([z.literal('baner'), z.literal('streamer')]))
//   .transform((include) => transformApiInclude(include));

// BLOCKCHAIN_DATA_FEED
const findBasicInfo = z.object({
  query: z.object({
    chainId: z.number().optional(),
    symbol: z.string().optional(),
    name: z.string().optional(),
    // include: pageInclude,
  }),
});

// DATABASE
const findMany = z.object({
  query: z.object({
    symbol: z.array(z.string()).optional(),
  }),
});

const find = z.object({
  params: z.object({
    symbol: z.string(),
  }),
});

export namespace TokenApi {
  export namespace FindBasicInfo {
    const requestShape = findBasicInfo.shape;
    export type Query = z.input<typeof requestShape.query>;
    export type ResBody = { tokens: Token[] };
    export type Req = Request<any, any, any, Query>;
    export type Res = Response<ResBody>;
  }
  export namespace FindMany {
    const reqShape = findMany.shape;
    export type Query = z.input<typeof reqShape.query>;
    export type ResBody = { tokens: TokenCoinGecko[] };
    export type Req = Request<any, any, any, Query>;
    export type Res = Response<ResBody>;
  }
  export namespace Find {
    const reqShape = find.shape;
    export type Params = z.input<typeof reqShape.params>;
    export type ResBody = any;
    export type Req = Request<Params, any, any, any>;
    export type Res = Response<ResBody>;
  }
}

export const tokenApi = {
  findBasicInfo,
  findMany,
  find,
};
