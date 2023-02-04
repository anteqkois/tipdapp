import { Tipper, UserSession } from '@tipdapp/database';
import { Request, Response } from 'express';
import { SiweMessage } from 'siwe';
import { z } from '../config/zod';
import { ModifyObjectKey } from '../types';

const login = z.object({
  body: z.object({
    message: z.any(),
    signature: z.string(),
    type: z.union([z.literal('tipper'), z.literal('user')]),
  }),
});

export namespace AuthApi {
  export namespace Login {
    const reqShape = login.shape;
    export type Body = ModifyObjectKey<z.input<typeof reqShape.body>, { message: Partial<SiweMessage> }>;
    export type Req = Request<{}, {}, Body, {}>;
    export type Res = Response<{ message: string; tipper: Tipper } | { message: string; user: UserSession }>;
  }
}

export const authApi = {
  login,
};
