import { Prisma } from '@tipdapp/prisma';
import { prisma } from '../config/db';

const find = async (data: Prisma.PageFindFirstArgs) =>
  prisma.page.findFirst({
    where: data.where,
    include: {
      baner: true,
      ...data.include,
    },
  });

// const find = async (where: Prisma.PageWhereInput) => {
//   return await prisma.page.findMany({ where });
// };

const update = async (updateArgs: Prisma.PageUpdateArgs) =>
  prisma.page.update(updateArgs);
// return prisma.page.updateMany(updateArgs);
// const create = async (data: Prisma.UserTokenCreateInput) => {
//   return await prisma.userToken.create({
//     data,
//   });
// };

export const pageService = { find, update };
