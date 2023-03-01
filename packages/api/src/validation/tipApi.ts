import { Address, ModifyObjectKey, TipUI } from '@tipdapp/types';
import { Request, Response } from 'express';
import { z } from 'zod';

const findByAddress = z.object({
  query: z
    .object({
      page: z.union([z.string(), z.number()]),
      pageSize: z.union([z.string(), z.number()]),
    })
    .optional(),
});

const signature = z.object({
  body: z.object({
    tokenAmount: z.string().min(1),
    tokenAddress: z.string().length(42),
    userAddress: z.string().length(42),
  }),
});

export namespace TipApi {
  export namespace FindByAddress {
    const reqShape = findByAddress.shape;
    export type Query = z.input<typeof reqShape.query>;
    export type ResBody = { tips: TipUI[]; count: number };
    export type Req = Request<any, any, any, Query>;
    export type Res = Response<ResBody>;
  }
  export namespace Signature {
    const reqShape = signature.shape;
    export type Body = ModifyObjectKey<
      z.input<typeof reqShape.body>,
      { userAddress: Address; tokenAddress: Address }
    >;
    export type ResBody = {
      signature: string;
      signatureData: {
        tokenAmount: string;
        amountToMint: string;
        tokenToUser: string;
        fee: string;
        timestamp: number;
        tokenAddress: Address;
        userAddress: Address;
      };
    };
    export type Req = Request<unknown, unknown, Body, unknown>;
    export type Res = Response<ResBody>;
  }
}

export const tipApi = {
  findByAddress,
  signature,
};
