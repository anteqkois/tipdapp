import { Tipper } from '@tipdapp/types';
import { Request, Response } from 'express';
import { z } from 'zod';
import { transformApiInclude } from './utils';

const tipperInclude = z
  .array(z.union([z.literal('tips'), z.literal('_count')]))
  .transform((include) => transformApiInclude(include));

const find = z.object({
  query: z.object({
    nick: z.string().optional(),
    address: z.string().optional(),
    include: tipperInclude.optional(),
  }),
});

const create = z.object({
  body: z.object({
    address: z.string(),
    nick: z.string().optional(),
  }),
});

export namespace TipperApi {
  export namespace Find {
    const reqShape = find.shape;
    export type Query = z.input<typeof reqShape.query>;
    export type ResBody = { tipper: Tipper | null };
    export type Req = Request<unknown, unknown, unknown, Query>;
    export type Res = Response<ResBody>;
  }
  export namespace Create {
    const reqShape = create.shape;
    export type Body = z.input<typeof reqShape.body>;
    export type ResBody = { tipper: Tipper };
    export type Req = Request<unknown, unknown, Body, unknown>;
    export type Res = Response<ResBody>;
  }
}

export const tipperApi = {
  find,
  create,
};
