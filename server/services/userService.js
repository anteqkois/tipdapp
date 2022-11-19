import prisma from '../config/db.js';

const create = async (data) => {
  return await prisma.user.create({
    data: {
      address: data.address,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      nick: data.nick,
      roles: ['streamer'],
      page: {
        create: {
          url: data.nick,
        },
      },
    },
    include: {
      avatar: true,
      token: {
        select: {
          address: true,
          chainId: true,
          name: true,
          symbol: true,
          txHash: true,
        },
      },
      page: true,
    },
  });
};

const find = async (data) => {
  return await prisma.user.findFirst({
    where: {
      address: data.address,
    },
    include: {
      avatar: true,
      token: {
        select: {
          address: true,
          chainId: true,
          name: true,
          symbol: true,
          txHash: true,
        },
      },
      page: true,
    },
  });
};

const checkIfExist = async ({ nick, email, address }) => {
  return await prisma.user.findFirst({
    where: {
      OR: [{ email }, { nick }, { address }],
    },
    // select: {
    //   email: true,
    //   nick: true,
    // },
  });
};

const updateRefreshTokens = async ({ address, refreshTokens }) => {
  console.log('scalar lists have to be empty', refreshTokens);
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

const removeRefreshToken = async ({ address, refreshToken }) => {
  const user = await findByRefreshToken({ refreshToken });
  const refreshTokens = user.refreshTokens.filter((rt) => rt !== refreshToken);

  await updateRefreshTokens({ address, refreshTokens });
};

const addRefreshToken = async ({ address, refreshToken }) => {
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

const findByRefreshToken = async ({ refreshToken }) => {
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

const User = { create, find, checkIfExist, updateRefreshTokens, findByRefreshToken, addRefreshToken, removeRefreshToken };
export { User };
