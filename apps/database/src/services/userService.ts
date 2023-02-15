import { Prisma } from '@prisma/client';
import { prisma } from '../config/db';

const create = async (data: Prisma.UserCreateInput) =>
  prisma.user.create({
    data,
    include: {
      streamer: { include: { page: true } },
      userToken: true,
      avatar: true,
      settings: true,
    },
  });

const find = async ({ where, include }: Prisma.UserFindFirstArgs) =>
  // TODO change in future to fetch only default role, to get better performance
  prisma.user.findFirst({
    where,
    include,
  });
const checkIfExist = async (where: Prisma.UserWhereInput) =>
  prisma.user.findFirst({
    where,
  });

const findByRefreshToken = async ({ refreshToken }: { refreshToken: string }) =>
  prisma.user.findFirst({
    where: {
      sessions: { some: { refreshTokens: { has: refreshToken } } },
    },
    select: {
      address: true,
      roles: true,
      activeRole: true,
      nick: true,
    },
  });

export const userService = {
  create,
  find,
  checkIfExist,
  findByRefreshToken,
};
