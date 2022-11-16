import { prisma } from '../config/db.js';
import { createApiError } from '../middlewares/error.js';

// const PAGE_SIZE = 2;
const findByAddress = async (req, res) => {
  const page = parseInt(req.query?.page ?? 1);
  const pageSize = parseInt(req.query?.pageSize ?? 20);
  const skip = (page - 1) * pageSize;
  // typeof req.query?.userAddress === 'undefined' && createApiError('Missing user address.');

  const count = await prisma.tip.count({
    where: {
      userAddress: req.user.metadata.address,
    },
  });

  const tips = await prisma.tip.findMany({
    skip,
    take: pageSize,
    where: {
      userAddress: req.user.metadata.address,
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
