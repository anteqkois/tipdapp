import { Prisma } from '@prisma/client';
import prisma from '../config/db';

const find = async (where: Prisma.UserTokenWhereInput) => {
  return await prisma.userToken.findFirst({
    where,
  });
};

const create = async (data: Prisma.UserTokenCreateInput) => {
  return await prisma.userToken.create({
    data,
  });
};

const userTokenService = { find, create };
export { userTokenService };
