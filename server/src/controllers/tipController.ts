import { Request, Response } from 'express';
import { createApiError } from '../middlewares/error.js';
import { TipService } from '../services/tipService';

const findByAddress = async (
  req: Request<{}, {}, {}, { page: string; pageSize: string }>,
  res: Response
) => {
  //TODO Validate query params
  const page = parseInt(req.query?.page ?? 1);
  const pageSize = parseInt(req.query?.pageSize ?? 20);
  const skip = (page - 1) * pageSize;

  const count = await TipService.count({
    userAddress: req.user.address,
  });

  //{option:{}, where:{}, }
  //TODO With Typescript it will  be easier to protoect use right option and where argument
  const tips = await TipService.findMany({
    skip,
    take: pageSize,
    where: { userAddress: req.user.address },
  });

  if (tips) {
    return res.status(200).send({ tips, count });
  } else {
    //TODO other error message
    createApiError('No tips found.', 404);
  }
};

export { findByAddress };
export default {
  findByAddress,
};
