import { z } from '../config/zod';

const find = z.object({
  nick: z.string(),
  streamer: z.boolean().default(false),
  tipper: z.boolean().default(false),
  userToken: z.boolean().default(false),
});

// const createFormParse = (data: UserTokenValidation.CreateForm) =>
//   validationHelper<UserTokenValidation.CreateForm>(data, createForm);

// const createParse = (data: UserTokenValidation.Create) =>
//   validationHelper<UserTokenValidation.Create>(data, create);

export namespace UserApi {
  export type Find = z.infer<typeof find>;
}

export const userApi = {
  find,
};
