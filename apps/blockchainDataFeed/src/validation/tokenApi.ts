import { Request } from 'express';
import { z } from 'zod';

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
  export namespace FindMany {
    const reqShape = findMany.shape;
    export type Query = z.input<typeof reqShape.query>;
    export type Req = Request<any, any, any, Query>;
  }
  export namespace Find {
    const reqShape = find.shape;
    export type Params = z.input<typeof reqShape.params>;
    export type Req = Request<Params, any, any, any>;
  }
}

export const tokenApi = {
  findMany,
  find,
};
