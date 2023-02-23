import { Prisma } from '@tipdapp/prisma';
import { prisma } from '../config/db';

const findMany = async ({
  skip,
  take,
  where,
  include,
}: Prisma.TipFindManyArgs) =>
  prisma.tip.findMany({
    skip,
    take,
    where,
    orderBy: {
      date: 'asc',
    },
    include: {
      ...include,
    },
  });

// const findMany = async ({ skip, take, where }: Prisma.TipAggregateArgs) =>
//   prisma.tip.findMany({
//     skip,
//     take,
//     where,
//     orderBy: {
//       date: 'asc',
//     },
//     include: {
//       token: {
//         select: {
//           name: true,
//           symbol: true,
//           address: true,
//         },
//       },
//       tipper: {
//         select: {
//           nick: true,
//         },
//       },
//       // user: true,
//     },
//   });

const count = async (data: Prisma.TipWhereInput) =>
  prisma.tip.count({
    where: data,
  });

export const tipService = { findMany, count };
