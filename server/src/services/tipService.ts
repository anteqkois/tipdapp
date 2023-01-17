import { Prisma } from '@prisma/client';
import prisma from '../config/db';

const findMany = async ({ skip, take, where }: Prisma.TipAggregateArgs) => {
  return await prisma.tip.findMany({
    skip,
    take,
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

const count = async (data: Prisma.TipWhereInput) => {
  return await prisma.tip.count({
    where: data,
  });
};

export const tipService = { findMany, count };
