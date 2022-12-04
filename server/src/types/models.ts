// import { Prisma, Streamer, Tipper, User } from "./prisma";

import { Prisma, Streamer, Tipper, User } from "@prisma/client";

export type UserSession =
  | (User & {
      streamer: Streamer | null;
    })
  | (User & {
      tipper: Tipper | null;
    });

export type DecodedUser = {
  address: string;
  nick: string;
  roles: string[];
};

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
