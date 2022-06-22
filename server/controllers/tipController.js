const { prismaClient } = require('../../prisma/client');
const { createApiError } = require('../middlewares/error');

const PAGE_SIZE = 2;

const findByUserWalletAddress = async (req, res) => {
  const page = req.query?.page ?? 0;
  // console.log(page);
  // console.log(req.query);

  // const skip = page * PAGE_SIZE - PAGE_SIZE;
  const skip = page * PAGE_SIZE;

  const tips = await prismaClient.tip.findMany({
    skip,
    take: PAGE_SIZE,
    where: {
      userWalletAddress: req.query?.userWalletAddress,
    },
    orderBy: {
      date: 'asc',
    },
    include: {
      cryptocurrency: {
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

  // console.log(tips);

  if (tips) {
    // const lastTipsInResults = tips[1]; // Remember: zero-based index! :)
    // const cursor = lastTipsInResults.date; // Example: 29

    return res.status(200).send( tips );
    // return res.status(200).send({ tips });
  } else {
    createApiError('No tips found.');
  }
};

module.exports = { findByUserWalletAddress };
