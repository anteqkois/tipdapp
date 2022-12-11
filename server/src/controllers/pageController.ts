import { createApiError } from '@middlewares/error';
import { pageService } from '@services/pageService';
import { mockDecodedUser } from '../types/models';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { pageValidation } from '../validation';

const findByNick = async (
  req: Request<{}, {}, {}, { nick: string }>,
  res: Response
) => {
  const { nick } = req.query;

  const page = await pageService.find({
    streamer: { some: { user: { nick } } },
  });

  if (page) {
    return res.status(StatusCodes.OK).send({ page });
  } else {
    createApiError('Page not found for this user.');
  }
};

const update = async (req: Request, res: Response) => {
  // const 
  const parsedData = pageValidation.updateParse(req.body);

  req.user = mockDecodedUser;
  //! check if somenone add aditional body data it will pass?

  //! TODO create method to get active role form decodedUser and use it to update properly related page
  const data = await pageService.update({
    where: { streamer: { some: { address: req.user.address } } },
    data: req.body,
  });

  res.status(StatusCodes.CREATED).send({ page: data });
};

export const pageController = { findByNick, update };
