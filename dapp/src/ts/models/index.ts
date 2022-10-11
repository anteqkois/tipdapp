import { Prisma } from '@prisma/client';

const userSession = Prisma.validator<Prisma.UserArgs>()({
  include: { avatar: true, token: true },
});

export type UserSession = Prisma.UserGetPayload<typeof userSession>;

const tipUI = Prisma.validator<Prisma.TipArgs>()({
  include: {
    token: {
      select: {
        name: true,
        symbol: true,
      },
    },
    tipper: {
      select: {
        nick: true,
      },
    },
  },
});

export type TipUI = Prisma.TipGetPayload<typeof tipUI>;
