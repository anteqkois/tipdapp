import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { createApiError } from '../middlewares/error';
import { userTokenService } from '../services/userTokenService';
import { userTokenValidation } from '../validation/userTokenValidation';

const find = async (
  req: Request<{}, {}, {}, Prisma.UserTokenWhereInput>,
  res: Response
) => {
  //TODO! make req.query validation ! to prevent hack

  const userToken = await userTokenService.find(req.query);

  if (userToken) {
    return res.status(200).send({ userToken });
  } else {
    createApiError('No token found.', 404);
  }
};

const create = async (req: Request, res: Response) => {
  const { address, chainId, name, symbol, txHash, userAddress } =
    userTokenValidation.createParse(req.body);

  const token = await userTokenService.create({
    address,
    chainId,
    name,
    symbol,
    txHash,
    user: {
      connect: {
        address: userAddress,
      },
    },
  });

  console.log('create new token', token);
  return res.status(200).send({ token });
};

export { find, create };
export default {
  find,
  create,
};
