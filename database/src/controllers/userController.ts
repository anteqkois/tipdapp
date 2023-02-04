import { createApiError } from '@middlewares/error';
import { userService } from '@services/userService';
import { Request, Response } from 'express';
import { userApi, UserApi } from '../validation/userApi';

const findByNick = async (
  req: Request<{}, {}, {}, UserApi.FindByNick.Query>,
  res: Response
) => {
  const parsedParams = userApi.findByNick.params.parse(req.params);
  const parsedQuery = userApi.findByNick.query.parse(req.query);

  const user = await userService.find({
    where: { nick: parsedParams.nick },
    include: {
      avatar: true,
      streamer: parsedQuery.include.streamer
        ? { include: { activeTokens: true, page: true } }
        : false,
      userToken: parsedQuery.include.userToken,
      tips: parsedQuery.include.tips,
    },
  });

  if (user) {
    return res.status(200).send({ user: user });
  } else {
    createApiError('Something went wrong.');
  }
};

const find = async (
  req: Request<{}, {}, {}, UserApi.Find.Query>,
  res: Response
) => {
  const parsedQuery = userApi.find.query.parse(req.query);

  const user = await userService.find({
    where: { nick: parsedQuery.nick, address:parsedQuery.address },
    include: {
      avatar: true,
      streamer: parsedQuery.include?.streamer
        ? { include: { activeTokens: true, page: true } }
        : false,
      userToken: parsedQuery.include?.userToken,
      tips: parsedQuery.include?.tips,
    },
  });

  if (user) {
    return res.status(200).send({ user: user });
  } else {
    createApiError('Something went wrong.');
  }
};

export const userController = { findByNick, find };
