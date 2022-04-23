const { prismaClient } = require('../../prisma/client');
const { createApiError } = require('../middlewares/error');

const find = async (req, res) => {
  const user = await prismaClient.user.findFirst({
    where: { id: req.user.user_metadata.id },
  });

  if (user) {
    return res.status(200).send({ user: user });
  } else {
    createApiError('Something went wrong.');
  }
};

module.exports = { find };
