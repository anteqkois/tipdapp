import { NestedPage, Role } from '@tipdapp/types';
import { Request, Response } from 'express';
import { z } from 'zod';
import { transformApiInclude } from './utils';

const pageInclude = z
  .array(z.union([z.literal('baner'), z.literal('streamer')]))
  .transform((include) => transformApiInclude(include));

const findByAffixUrl = z.object({
  params: z.object({
    role: z.nativeEnum(Role),
    affixUrl: z.string(),
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
  body: z.object({
    affixUrl: z
      .string()
      .min(3, 'Url page must have 3 or more characters.')
      .max(30, 'Url can be up to 20 characters long.')
      .optional(),
    description: z
      .string()
      .min(20, 'Description page must have 20 or more characters.')
      .max(500, 'Description can be up to 200 characters long.')
      .optional(),
    tokenAddresses: z
      .array(z.string(), {
        required_error: 'At least one token must be selected.',
      })
      .min(1, 'At least one token must be selected.'),
    // banerId: z.string().min(1, { message: 'Wrong file.' }).optional(),
  }),
});

export namespace PageApi {
  export namespace FindByAffixUrl {
    const reqShape = findByAffixUrl.shape;
    export type Query = z.input<typeof reqShape.query>;
    export type Params = z.input<typeof reqShape.params>;
    export type ResBody = {
      page: NestedPage;
    };
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
    export type ResBody = { message: string };
    export type Req = Request<any, any, Body, any>;
    export type Res = Response<ResBody>;
  }
}

export const pageApi = {
  findByAffixUrl,
  find,
  update,
};
