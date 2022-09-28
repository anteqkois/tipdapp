import { prismaClient } from '../../lib/prismaClient.js';
import { tokenSchema } from '../../schema/tokenSchema.js';
import { createApiError } from '../middlewares/error.js';

const findByAddress = async (req, res) => {
  typeof req.query?.address === 'undefined' && createApiError('Missing token address.');

  const token = prismaClient.token.findFirstOrThrow({
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
  console.log(req.body);
  tokenSchema.parse(req.body);
};

export { findByAddress, create };
export default {
  findByAddress,
};
