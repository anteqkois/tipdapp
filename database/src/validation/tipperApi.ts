import { Tipper } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from '../config/zod';
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
    export type Req = Request<{}, {}, {}, Query>;
    export type Res = Response<{ tipper: Tipper }>;
  }
  export namespace Create {
    const reqShape = create.shape;
    export type Body = z.input<typeof reqShape.body>;
    export type ResBody = { tipper: Tipper };
    export type Req = Request<{}, {}, Body, {}>;
    export type Res = Response<ResBody>;
  }
}

export const tipperApi = {
  find,
  create,
};
