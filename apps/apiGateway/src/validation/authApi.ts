import { Role, Tipper, UserSession } from '@tipdapp/database';
import { ModifyObjectKey } from '@tipdapp/types';
import { Request, Response } from 'express';
import { SiweMessage } from 'siwe';
import { z } from 'zod';

const login = z.object({
  body: z.object({
    message: z.any(),
    signature: z.string(),
    type: z.union([z.literal('tipper'), z.literal('user')]),
  }),
});

const signUp = z.object({
  body: z.object({
    message: z.any(),
    signature: z.string(),
    formData: z.object({
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
      // roles: z.set(z.union([z.literal(Role.charity), z.literal(Role.streamer)])),
      // roles: z.tuple([]).rest(z.union([z.literal(Role.charity), z.literal(Role.streamer)])),
    }),
  }),
});

export namespace AuthApi {
  export namespace Login {
    const reqShape = login.shape;
    export type Body = ModifyObjectKey<
      z.input<typeof reqShape.body>,
      { message: Partial<SiweMessage> }
    >;
    export type ResBody =
      | { message: string; tipper: Tipper }
      | { message: string; user: UserSession };
    export type Req = Request<any, any, Body, any>;
    export type Res = Response<ResBody>;
  }
  export namespace SignUp {
    const reqShape = signUp.shape;
    export type Body = ModifyObjectKey<
      z.input<typeof reqShape.body>,
      { message: Partial<SiweMessage> }
    >;
    export type ResBody = { message: string; user: UserSession };
    export type Req = Request<any, any, Body, any>;
    export type Res = Response<ResBody>;
  }
}

export const authApi = {
  signUp,
  login,
};
