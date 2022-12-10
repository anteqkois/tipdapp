import { Prisma } from '@prisma/client';
import prisma from '../config/db';

const find = async (where: Prisma.PageWhereInput) => {
  return await prisma.page.findFirst({ where });
};

// const create = async (data: Prisma.UserTokenCreateInput) => {
//   return await prisma.userToken.create({
//     data,
//   });
// };

const pageService = { find };
export { pageService };
