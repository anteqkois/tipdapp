import { Prisma } from '@prisma/client';
import { prisma } from '../config/db';

const find = async (where: Prisma.UserTokenWhereInput) =>
  prisma.userToken.findFirst({
    where,
  });

const create = async (data: Prisma.UserTokenCreateInput) =>
  prisma.userToken.create({
    data,
  });

export const userTokenService = { find, create };
