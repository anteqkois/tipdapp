import { z } from '../config/zod';

const findMany = {
  query: z.object({
    symbol: z.array(z.string()).optional(),
  }),
};
const find = {
  params: z.object({
    symbol: z.string(),
  }),
};

export namespace TokenApi {
  export namespace FindMany {
    export type Query = z.input<typeof findMany.query>;
  }
  export namespace Find {
    export type Params = z.input<typeof find.params>;
  }
}

// const parseRequest(requestSchema: any)

export const tokenApi = {
  findMany,
  find,
};
