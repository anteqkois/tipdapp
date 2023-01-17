import { Token } from '@prisma/client';
import { z } from '../config/zod';
// import { transformApiInclude } from './utils';

// const pageInclude = z
//   .array(z.union([z.literal('baner'), z.literal('streamer')]))
//   .transform((include) => transformApiInclude(include));

const find = {
  query: z.object({
    chainId: z.number().optional(),
    symbol: z.string().optional(),
    name: z.string().optional(),
    // include: pageInclude,
  }),
};

export namespace TokenApi {
  export namespace Find {
    export type Query = z.input<typeof find.query>;
    export type Response = { tokens: Token[] };
  }
}

export const tokenApi = {
  find,
};
