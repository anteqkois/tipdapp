import { Prisma } from '@prisma/client';
import { prisma } from '../config/db';

const create = async (createData: Prisma.TipperCreateInput) =>
  prisma.tipper.create({
    data: { ...createData },
  });

const find = async (data: Prisma.TipperFindFirstArgs) =>
  prisma.tipper.findFirst({
    where: data.where,
  });

export const tipperService = {
  create,
  find,
};
