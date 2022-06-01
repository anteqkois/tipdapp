const { prismaClient } = require('../../prisma/client');
const { createApiError } = require('../middlewares/error');

const findByUserWalletAddress = async (req, res) => {
  // console.log('req', req);
  // console.log('req.params', req.params);
// userWalletAddress: req.params.walletAddress;

  const tips = await prismaClient.tip.findMany({
    // where: {  userWalletAddress: req.params.walletAddress },
  });

  console.log(tips);

  if (tips) {
    return res.status(200).send({ tips });
  } else {
    createApiError('No tips found.');
  }
};

module.exports = { findByUserWalletAddress };
