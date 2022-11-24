// import { prisma } from '../../services/prisma';
import { Request, Response } from 'express';
import { createApiError } from '../middlewares/error';
import { UserService } from '../services/userService';

const find = async (req: Request, res: Response) => {
  const user = await UserService.find({ where: { address: req.user.address } });

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
