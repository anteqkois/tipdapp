const { prismaClient } = require('../../prisma/client');
const { createApiError } = require('../middlewares/error');

const findByUserWalletAddress = async (req, res) => {
  const tips = await prismaClient.tip.findMany({
    where: {
      userWalletAddress: req.query?.userWalletAddress,
    },
  });

  console.log(tips);

  if (tips) {
    return res.status(200).send(tips);
  } else {
    createApiError('No tips found.');
  }
};

module.exports = { findByUserWalletAddress };
