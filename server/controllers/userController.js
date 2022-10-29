// import { prisma } from '../../services/prisma';
import { prisma } from '../lib/db.js';
import { createApiError } from '../middlewares/error.js';

const find = async (req, res) => {
  const user = await prisma.user.findFirst({
    where: { id: req.user.user_metadata.id },
  });

  if (user) {
    return res.status(200).send({ user: user });
  } else {
    createApiError('Something went wrong.');
  }
};
export { find };
export default {
  find,
};
