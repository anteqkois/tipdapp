import { createApiError } from '@middlewares/error';
import { Role, User } from '@prisma/client';
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
    roles: z.tuple([z.literal(Role.streamer)]),
    // role: z.literal(Role.streamer),
    // role: z.array(Role.streamer),
    // address: z.string().length(42, { message: 'Wrong user address' }),
  })
);

const createStreamerParse = (data: UserValidation.CreateStreamer) =>
  validationHelper(data, createStreamer);

const createParse = (body: UserValidation.CreateUser) => {
  switch (type(body)) {
    case 'streamer':
      return createStreamerParse(body as UserValidation.CreateStreamer);
    default:
      return createApiError('No avaible role');
  }
};

// const create = (body: UserValidation.CreateUser) => {
//   if (body.role === 'streamer') {
//     return createStreamer.parse(body);
//   } else {
//     return createTipper.parse(body);
//   }
// };

const type = (body: Pick<User, 'roles'>) => {
  if (body.roles.includes(Role.streamer)) {
    return Role.streamer;
  }
};

export namespace UserValidation {
  export type CreateStreamer = z.infer<typeof createStreamer>;
  export type CreateUser = Omit<CreateStreamer, 'roles'> & {
    roles: Role[];
  };
}

export const userValidation = {
  // createTipper,
  // createStreamer,
  // create,
  createParse,
  type,
};
