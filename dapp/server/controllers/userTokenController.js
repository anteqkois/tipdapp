import { prismaClient } from '../../lib/prismaClient.js';
import { userTokenSchema } from '../../schema/userTokenSchema.js';
import { createApiError } from '../middlewares/error.js';

const findByAddress = async (req, res) => {
  typeof req.query?.address === 'undefined' && createApiError('Missing token address.');

  const token = prismaClient.userToken.findFirstOrThrow({
    where: {
      address: req.query.address,
    },
  });

  if (token) {
    return res.status(200).send({ token });
  } else {
    createApiError('No token found.', 404);
  }
};

const create = async (req, res) => {
  console.log('REQUEST BODY', req.body);

  // try {

  userTokenSchema.parse(req.body);
  const { address, symbol, name, chainId, txHash, user } = req.body;

  const token = await prismaClient.userToken.create({
    data: {
      address,
      symbol,
      name,
      chainId,
      txHash,
      User: {
        connect: {
          walletAddress: user,
        },
      },
    },
  });

  console.log('create new token', token);
  return res.status(200).send({ token });
  // } catch (error) {
  //   console.log(error);
  // }
};

export { findByAddress, create };
export default {
  findByAddress,
};
