import { TipUI } from '@tipdapp/types';
import { Request, Response } from 'express';
import { z } from 'zod';

const findByAddress = z.object({
  query: z
    .object({
      page: z.union([z.string(), z.number()]),
      pageSize: z.union([z.string(), z.number()]),
      // page: z.string(),
      // pageSize: z.string(),
    })
    .optional(),
});

export namespace TipApi {
  export namespace FindByAddress {
    const reqShape = findByAddress.shape;
    export type Query = z.input<typeof reqShape.query>;
    export type ResBody = { tips: Partial<TipUI>[]; count: number };
    export type Req = Request<any, any, any, Query>;
    export type Res = Response<ResBody>;
  }
}

export const tipApi = {
  findByAddress,
};
