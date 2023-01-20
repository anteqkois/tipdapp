import { Role } from '@prisma/client';
import { z } from '../config/zod';
import { update as _update } from './pageValidation';
import { transformApiInclude } from './utils';

const pageInclude = z
  .array(z.union([z.literal('baner'), z.literal('streamer')]))
  .transform((include) => transformApiInclude(include));

const findByAffixUrl = {
  params: z.object({
    affixUrl: z.string(),
    role: z.nativeEnum(Role),
  }),
  query: z
    .object({
      include: pageInclude.optional(),
    })
    .optional(),
};

const find = {
  query: z.object({
    nick: z.string(),
    include: pageInclude,
  }),
};

const update = {
  params: _update,
};

export namespace PageApi {
  export namespace FindByAffixUrl {
    export type Query = z.input<typeof findByAffixUrl.query>;
    export type Params = z.input<typeof findByAffixUrl.params>;
  }
  export namespace Find {
    export type Query = z.input<typeof find.query>;
  }
  export namespace Update {
    export type Params = z.input<typeof update.params>;
  }
}

export const pageApi = {
  findByAffixUrl,
  find,
  update
};
