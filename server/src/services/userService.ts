import { Prisma } from '@prisma/client';
import prisma from '../config/db';

const createStreamer = async (createData: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: {
      roles: ['streamer', 'tipper'],
      defaultRole: 'streamer',
      ...createData,
    },
    include: {
      streamer: true,
      // avatar: true,
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
};
const createTipper = async (createData: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: {
      roles: ['tipper'],
      defaultRole: 'tipper',
      ...createData,
    },
    include: {
      tipper: true,
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
      streamer: true,
      tipper: true,
      userToken: true,
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
};
const checkIfExist = async (where: Prisma.UserWhereInput) => {
  return await prisma.user.findFirst({
    where,
    // select: {
    //   email: true,
    //   nick: true,
    // },
  });
};

const updateRefreshTokens = async ({
  address,
  refreshTokens,
}: {
  address: string;
  refreshTokens: string[];
}) => {
  await prisma.user.update({
    where: {
      address: address,
    },
    data: {
      refreshTokens: {
        set: refreshTokens,
      },
    },
  });
};

const removeRefreshToken = async ({
  address,
  refreshToken,
}: {
  address: string;
  refreshToken: string;
}) => {
  const user = await findByRefreshToken({ refreshToken });
  const refreshTokens =
    user?.refreshTokens.filter((rt) => rt !== refreshToken) ?? [];

  await updateRefreshTokens({ address, refreshTokens });
};

const addRefreshToken = async ({
  address,
  refreshToken,
}: {
  address: string;
  refreshToken: string;
}) => {
  return await prisma.user.update({
    where: {
      address: address,
    },
    data: {
      refreshTokens: {
        push: refreshToken,
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
      refreshTokens: {
        has: refreshToken,
      },
    },
    select: {
      refreshTokens: true,
      address: true,
      roles: true,
      nick: true,
    },
  });
};

const UserService = {
  createStreamer,
  createTipper,
  find,
  checkIfExist,
  updateRefreshTokens,
  findByRefreshToken,
  addRefreshToken,
  removeRefreshToken,
};
export { UserService };
