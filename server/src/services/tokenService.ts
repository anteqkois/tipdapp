import { Prisma } from '@prisma/client';
import prisma from '../config/db';

const findMany = async ({ where }: Prisma.TokenAggregateArgs) => {
  return await prisma.token.findMany({
    where,
    orderBy: {
      name: 'asc',
    },
    // include: {
    // },
  });
};

export const tokenService = { findMany };
