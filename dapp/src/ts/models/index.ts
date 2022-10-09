import { Prisma } from '@prisma/client';

const userSession = Prisma.validator<Prisma.UserArgs>()({
  include: { avatar: true, token: true },
});

export type UserSession = Prisma.UserGetPayload<typeof userSession>;
