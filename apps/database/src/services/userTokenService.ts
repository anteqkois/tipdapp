import { Prisma } from '@tipdapp/prisma';
import { UserToken } from '@tipdapp/types';
import { prisma } from '../config/db';
// Promise<UserToken | null>;
const find = async (where: Prisma.UserTokenWhereInput) =>
  prisma.userToken.findFirst({
    where,
  }) as Promise<UserToken | null>;

const create = async (data: Prisma.UserTokenCreateInput) =>
  prisma.userToken.create({
    data,
  }) as Promise<UserToken>;

export const userTokenService = { find, create };
