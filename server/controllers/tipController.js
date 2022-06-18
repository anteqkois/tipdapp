const { prismaClient } = require('../../prisma/client');
const { createApiError } = require('../middlewares/error');

const findByUserWalletAddress = async (req, res) => {
  const tips = await prismaClient.tip.findMany({
    take: 2,
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
    const lastTipsInResults = tips[1]; // Remember: zero-based index! :)
    const cursor = lastTipsInResults.date; // Example: 29

    return res.status(200).send({ tips, cursor });
  } else {
    createApiError('No tips found.');
  }
};

module.exports = { findByUserWalletAddress };
