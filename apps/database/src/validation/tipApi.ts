import { Request, Response } from 'express';
import { z } from '../config/zod';
import { TipUI } from '../types';

const findByAddress = z.object({
  query: z
    .object({
      page: z.string(),
      pageSize: z.string(),
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
