import { Role } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from '../config/zod';
import { update as _update } from './pageValidation';
import { transformApiInclude } from './utils';

const pageInclude = z
  .array(z.union([z.literal('baner'), z.literal('streamer')]))
  .transform((include) => transformApiInclude(include));

const findByAffixUrl = z.object({
  params: z.object({
    affixUrl: z.string(),
    role: z.nativeEnum(Role),
  }),
  query: z
    .object({
      include: pageInclude.optional(),
    })
    .optional(),
});

const find = z.object({
  query: z.object({
    nick: z.string(),
    include: pageInclude,
  }),
});

const update = z.object({
  body: _update,
});

export namespace PageApi {
  export namespace FindByAffixUrl {
    const reqShape = findByAffixUrl.shape;
    export type Query = z.input<typeof reqShape.query>;
    export type Params = z.input<typeof reqShape.params>;
    export type ResBody = any;
    export type Req = Request<Params, any, any, Query>;
    export type Res = Response<ResBody>;
  }
  export namespace Find {
    const reqShape = find.shape;
    export type Query = z.input<typeof reqShape.query>;
    export type ResBody = any;
    export type Req = Request<any, any, any, Query>;
    export type Res = Response<ResBody>;
  }
  export namespace Update {
    const reqShape = update.shape;
    export type Body = z.input<typeof reqShape.body>;
    export type ResBody = any;
    export type Req = Request<any, any, Body, any>;
    export type Res = Response<ResBody>;
  }
}

export const pageApi = {
  findByAffixUrl,
  find,
  update,
};
