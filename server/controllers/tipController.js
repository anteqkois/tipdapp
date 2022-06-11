const { prismaClient } = require('../../prisma/client');
const { createApiError } = require('../middlewares/error');

const findByUserWalletAddress = async (req, res) => {
  // console.log(req.params.walletAddress);
  // console.log(req.params);
  console.log(req.query);

  const tips = await prismaClient.tip.findMany({
    where: req.query,
  });

  // console.log(tips);

  if (tips) {
    return res.status(200).send(tips);
  } else {
    createApiError('No tips found.');
  }
};

module.exports = { findByUserWalletAddress };
