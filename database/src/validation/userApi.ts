import { Role } from '@prisma/client';
import { UserSession } from '../types';
import { Request, Response } from 'express';
import { z } from '../config/zod';
import { transformApiInclude } from './utils';

const userInclude = z
  .array(
    z.union([
      z.literal('avatar'),
      z.literal('streamer'),
      z.literal('tips'),
      z.literal('userToken'),
    ])
  )
  .transform((include) => transformApiInclude(include));

const findByNick = {
  query: z.object({
    include: userInclude,
  }),
  params: z.object({
    nick: z.string(),
  }),
};

const find = {
  query: z.object({
    nick: z.string().optional(),
    address: z.string().optional(),
    include: userInclude.optional(),
  }),
};

const create = z.object({
  body: z.object({
    address: z.string(),
    email: z.string().email(),
    nick: z
      .string()
      .min(2, { message: 'Nick must have 2 or more characters.' }),
    firstName: z
      .string()
      .min(3, { message: 'First name must have 3 or more characters.' }),
    lastName: z
      .string()
      .min(3, { message: 'Last name must have 3 or more characters.' }),
    roles: z.array(
      z.union([z.literal(Role.charity), z.literal(Role.streamer)])
    ),
  }),
});

export namespace UserApi {
  export namespace FindByNick {
    export type Query = z.input<typeof findByNick.query>;
    export type Params = z.input<typeof findByNick.params>;
  }
  export namespace Find {
    export type Query = z.input<typeof find.query>;
  }
  export namespace Create {
    const reqShape = create.shape;
    export type Body = z.input<typeof reqShape.body>;
    export type ResBody = { user: UserSession };
    export type Req = Request<{}, {}, Body, {}>;
    export type Res = Response<ResBody>;
  }
}

export const userApi = {
  findByNick,
  find,
  create,
};
