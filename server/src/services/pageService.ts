import { Prisma } from '@prisma/client';
import prisma from '../config/db';

const find = async (where: Prisma.PageWhereInput) => {
  return await prisma.page.findFirst({ where });
};

const update = async (updateArgs: Prisma.PageUpdateManyArgs) => {
  return prisma.page.updateMany(updateArgs);
};

// const create = async (data: Prisma.UserTokenCreateInput) => {
//   return await prisma.userToken.create({
//     data,
//   });
// };

const pageService = { find, update };
export { pageService };
