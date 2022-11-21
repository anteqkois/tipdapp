import prisma from '../config/db.js';

const findMany = async ({ option, where }) => {
  return await prisma.tip.findMany({
    ...option,
    where,
    orderBy: {
      date: 'asc',
    },
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
      // user: true,
    },
  });
};

const count = async ({ address }) => {
  return await prisma.tip.count({
    where: {
      userAddress: address,
    },
  });
};

const Tip = { findMany, count };
export { Tip };
