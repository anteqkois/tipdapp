// import { prisma } from '../../services/prisma';
import { Request, Response } from 'express';
import { pageService } from '../services/pageService';
import { createApiError } from '../middlewares/error';

const findByNick = async (
  req: Request<{}, {}, {}, { nick: string }>,
  res: Response
) => {
  const { nick } = req.query;

  const page = await pageService.find({ Streamer: { some: { user: { nick } } } });

  if (page) {
    return res.status(200).send({ page });
  } else {
    createApiError('Page not found for this user.');
  }
};

const update = async (req: Request, res: Response) => {

};

export { findByNick, update };
// export { find, findPage };
// export default {
//   find,
// };
