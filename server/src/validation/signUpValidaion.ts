import { Role } from '@prisma/client';
import { z } from '../config/zod';

export const createUser = z.object({
  email: z.string().email(),
  nick: z.string().min(2, { message: 'Nick must have 2 or more characters.' }),
  // role: z.array(z.nativeEnum(Role)),
});

export const createStreamer = createUser.merge(
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

export const createTipper = createUser.merge(
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

type CreateStreamerObject = z.infer<typeof createStreamer>;
type CreateTipperObject = z.infer<typeof createTipper>;

export type CreateUserObject = CreateStreamerObject | CreateTipperObject;

// const createStreamerParse = (data: CreateStreamerObject) =>
//   validationHelper<CreateStreamerObject>(data, createStreamer);

const createHelper = (body: CreateUserObject) => {
  if (body.role === 'streamer') {
    return createStreamer.parse(body);
    // return createStreamer.parse(body) as CreateStreamerObject;
  } else {
    return createTipper.parse(body);
    // return createTipper.parse(body) as CreateTipperObject;
  }
};

export const UserValidation = {
  createTipper,
  createStreamer,
  createHelper,
};
