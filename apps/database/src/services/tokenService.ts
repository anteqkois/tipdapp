import { Prisma } from '@tipdapp/prisma';
import { prisma } from '../config/db';

const findMany = async ({ where }: Prisma.TokenAggregateArgs) =>
  prisma.token.findMany({
    where,
    orderBy: {
      name: 'asc',
    },
    // include: {
    // },
  });

export const tokenService = { findMany };
