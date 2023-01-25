import { Prisma } from '@prisma/client';
import prisma from '../config/db';

const create = async (createData: Prisma.TipperCreateInput) => {
  return await prisma.tipper.create({
    data: { ...createData },
  });
};

const find = async (data: Prisma.TipperFindFirstArgs) => {
  return await prisma.tipper.findFirst({
    where: data.where,
    // include: {},
  });
};

export const tipperService = {
  create,
  find,
};
