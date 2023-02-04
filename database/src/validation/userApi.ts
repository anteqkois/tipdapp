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

export namespace UserApi {
  export namespace FindByNick {
    export type Query = z.input<typeof findByNick.query>;
    export type Params = z.input<typeof findByNick.params>;
  }
  export namespace Find {
    export type Query = z.input<typeof find.query>;
  }
}

export const userApi = {
  findByNick,
  find,
};
