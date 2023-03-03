import { Prisma } from '@tipdapp/prisma';
import { Token } from '@tipdapp/types';
import { prisma } from '../config/db';

const findMany = async ({ where }: Prisma.TokenAggregateArgs) =>
  prisma.token.findMany({
    where,
    orderBy: {
      name: 'asc',
    },
    // include: {
    // },
  }) as unknown as Token[] | null;

export const tokenService = { findMany };
