import { Role } from '@prisma/client';
import { validationHelper, z } from '../config/zod';
// import { Role } from '../types';

const createUser = z.object({
  email: z.string().email(),
  nick: z.string().min(2, { message: 'Nick must have 2 or more characters.' }),
  // role: z.array(z.nativeEnum(Role)),
});

const createStreamer = createUser.merge(
  z.object({
    firstName: z
      .string()
      .min(3, { message: 'First name must have 3 or more characters.' }),
    lastName: z
      .string()
      .min(3, { message: 'Last name must have 3 or more characters.' }),
    role: z.literal(Role.streamer),
    // role: z.array(Role.streamer),
    // address: z.string().length(42, { message: 'Wrong user address' }),
  })
);

const createTipper = createUser.merge(
  z.object({
    firstName: z
      .string()
      .min(3, { message: 'First name must have 3 or more characters.' })
      .optional(),
    lastName: z
      .string()
      .min(3, { message: 'Last name must have 3 or more characters.' })
      .optional(),
    role: z.literal(Role.tipper),
  })
);

const createStreamerParse = (data: UserValidation.CreateStreamer) =>
  validationHelper(data, createStreamer);

const createTipperParse = (data: UserValidation.CreateTipper) =>
  validationHelper(data, createTipper);

const createParse = (body: UserValidation.CreateUser) => {
  if (body.role === 'streamer') {
    return createStreamerParse(body);
  } else {
    return createTipperParse(body);
  }
};

// const create = (body: UserValidation.CreateUser) => {
//   if (body.role === 'streamer') {
//     return createStreamer.parse(body);
//   } else {
//     return createTipper.parse(body);
//   }
// };

export namespace UserValidation {
  export type CreateStreamer = z.infer<typeof createStreamer>;
  export type CreateTipper = z.infer<typeof createTipper>;
  export type CreateUser = CreateStreamer | CreateTipper;
}

export const userValidation = {
  // createTipper,
  // createStreamer,
  // create,
  createParse,
};
