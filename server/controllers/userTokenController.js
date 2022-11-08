import { prisma } from '../lib/db.js';
import { userTokenValidation } from '../validation/userTokenValidation.old.js';
import { createApiError } from '../middlewares/error.js';

const find = async (req, res) => {
  // typeof req.query?.address === 'undefined' && createApiError('Missing token address.');

  const token = await prisma.userToken.findFirst({
    where: {
      ...req.query,
    },
  });

  if (token) {
    console.log(token);
    return res.status(200).send({ token });
  } else {
    createApiError('No token found.', 404);
  }
};

const create = async (req, res) => {
  // console.log('REQUEST BODY', req.body);

  // try {

  userTokenValidation.parse(req.body);
  const { address, symbol, name, chainId, txHash, user } = req.body;

  const token = await prisma.userToken.create({
    data: {
      address,
      symbol,
      name,
      chainId,
      txHash,
      user: {
        connect: {
          address: user,
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

export { find, create };
export default {
  find,
  create,
};