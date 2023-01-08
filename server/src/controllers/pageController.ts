import { createApiError } from '@middlewares/error';
import { pageService } from '@services/pageService';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { pageValidation } from '../validation';

const findByNick = async (
  req: Request<{}, {}, {}, { nick: string }>,
  res: Response
) => {
  const { nick } = req.query;

  const pages = await pageService.find({
    OR: [
      {
        streamer: { some: { user: { nick } } },
      },
    ],
  });

  if (pages) {
    return res.status(StatusCodes.OK).send({ pages });
  } else {
    createApiError('Page not found for this user.');
  }
};

const update = async (req: Request, res: Response) => {
  // const
  const parsedData = pageValidation.updateParse(req.body);

  //! TODO implement role based auth
  switch (req.user.activeRole) {
    case 'streamer':
      await pageService.update({
        where: { streamer: { some: { address: req.user.address } } },
        data: parsedData,
      });
      break;
    default:
      createApiError(
        "Change active role. The currently selected can't have a page",
        StatusCodes.FORBIDDEN
      );
      break;
  }

  res.status(StatusCodes.CREATED).send({ message: 'Page was updated' });
};

export const pageController = { findByNick, update };
