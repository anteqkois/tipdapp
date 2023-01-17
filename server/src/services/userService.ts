import { Prisma } from '@prisma/client';
import prisma from '../config/db';

const createStreamer = async (createData: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: {
      roles: ['streamer', 'tipper'],
      activeRole: 'streamer',
      ...createData,
    },
    include: {
      tipper: true,
      streamer: { include: { page: true } },
      userToken: true,
      avatar: true,
    },
  });
};
const createTipper = async (createData: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: {
      roles: ['tipper'],
      activeRole: 'tipper',
      ...createData,
    },
    include: {
      tipper: true,
      avatar: true,
      // avatar: true,
    },
  });
};

const find = async (data: Prisma.UserFindFirstArgs) => {
  //TODO change in future to fetch only default role, to get better performance

  return await prisma.user.findFirst({
    where: data.where,
    include: {
      avatar: true,
      // streamer: { include: { page: true } },
      // tipper: true,
      // userToken: true,
      ...data.include,
      // token: {
      //   select: {
      //     address: true,
      //     chainId: true,
      //     name: true,
      //     symbol: true,
      //     txHash: true,
      //   },
      // },
      // page: true,
    },
  });

  // address: true,
  //     nick: true,
  //     email: true,
  //     // emailVerified: true,
  //     firstName: true,
  //     lastName: true,
  //     verified: true,
  //     createdAt: true,
  //     updateAt: true,
  //     allTipsCount: true,
  //     allTipsValue: true,
  //     // allWithdrawsValue: true,
  //     apperanceMode: true,
  //     roles: true,
  //     activeRole: true,
  //     refreshTokens: true,
  //     // avatar: true, | FileArgs
  //     avatarId: true,
};

const checkIfExist = async (where: Prisma.UserWhereInput) => {
  return await prisma.user.findFirst({
    where,
  });
};

const createSession = async ({
  address,
  ip,
  refreshToken,
}: {
  address: string;
  ip: string;
  refreshToken: string;
}) => {
  return prisma.user.update({
    where: { address },
    data: {
      sessions: { create: { ip, refreshTokens: { set: refreshToken } } },
    },
  });
};

const removeSession = async (where: Prisma.SessionWhereInput) => {
  await prisma.session.deleteMany({where})
  // await prisma.session.delete({ where });
};

const removeRefreshToken = async ({
  ip,
  refreshToken,
}: {
  ip: string;
  refreshToken: string;
}) => {
  const session = await prisma.session.findFirst({ where: { ip } });
  const refreshTokens =
    session?.refreshTokens.filter((rt) => rt !== refreshToken) ?? [];

  await prisma.session.update({
    where: { ip },
    data: { refreshTokens: { set: refreshTokens } },
  });
};

const addRefreshToken = async ({
  address,
  ip,
  refreshToken,
}: {
  address: string;
  ip: string;
  refreshToken: string;
}) => {
  return await prisma.user.update({
    where: {
      address: address,
    },
    data: {
      sessions: {
        update: {
          where: { ip },
          data: { refreshTokens: { push: refreshToken } },
        },
      },
    },
  });
};

const findByRefreshToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  return await prisma.user.findFirst({
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
};

export const userService = {
  createSession,
  removeSession,
  createStreamer,
  createTipper,
  find,
  checkIfExist,
  findByRefreshToken,
  addRefreshToken,
  removeRefreshToken,
};