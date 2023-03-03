import { Prisma } from '@tipdapp/prisma';
import { User } from '@tipdapp/types';
import { prisma } from '../config/db';

const create = async (data: Prisma.UserCreateInput) =>
  prisma.user.create({
    data,
    include: {
      streamer: { include: { page: true } },
      userToken: true,
      avatar: true,
      settings: true,
    },
  });

const find = async (data: Prisma.UserFindFirstArgs) =>
  // TODO change in future to fetch only default role, to get better performance
  prisma.user.findFirst({
    ...data,
  }) as unknown as User | null;

const checkIfExist = async (where: Prisma.UserWhereInput) =>
  prisma.user.findFirst({
    where,
  });

export const userService = {
  create,
  find,
  checkIfExist,
};
