import { z } from '../config/zod';

const find = {
  params: z.object({
    coin: z.string(),
  }),
};

export namespace DataApi {
  // export namespace FindByAffixUrl {
  //   export type Query = z.input<typeof findByAffixUrl.query>;
  //   export type Params = z.input<typeof findByAffixUrl.params>;
  // }
  export namespace Find {
    export type Params = z.input<typeof find.params>;
    // export type Query = z.input<typeof find.query>;
  }
}

export const dataApi = {
  find,
};
