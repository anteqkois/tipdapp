import { prismaClient } from '../../lib/prismaClient.js';
import { createApiError } from '../middlewares/error.js';

// const PAGE_SIZE = 2;
const findByAddress = async (req, res) => {
  const page = parseInt(req.query?.page) ?? 1;
  const pageSize = parseInt(req.query?.pageSize) ?? 20;
  const skip = (page - 1) * pageSize;

  typeof req.query?.userAddress === 'undefined' && createApiError('Missing user address.');

  const count = await prismaClient.tip.count({
    where: {
      userAddress: req.query.userAddress,
    },
  });

  const tips = await prismaClient.tip.findMany({
    skip,
    take: pageSize,
    where: {
      userAddress: req.query.userAddress,
    },
    orderBy: {
      date: 'asc',
    },
    include: {
      token: {
        select: {
          name: true,
          symbol: true,
        },
      },
      tipper: {
        select: {
          nick: true,
        },
      },
      // user: true,
    },
  });

  if (tips) {
    // const lastTipsInResults = tips[1]; // Remember: zero-based index! :)
    // const cursor = lastTipsInResults.date; // Example: 29
    // createApiError('Test', 404);
    return res.status(200).send({ tips, count });
    // return res.status(200).send({ tips, count });
    // return res.status(200).send({ tips });
  } else {
    //TODO other error message
    createApiError('No tips found.', 404);
  }
};

export { findByAddress };
export default {
  findByAddress,
};
