// import { prisma } from '../../services/prisma';
import { userService } from '@services/userService';
import { Request, Response } from 'express';
import { userApi, UserApi } from '../validation/userApi';

const find = async (
  req: Request<{}, {}, {}, UserApi.Find & { deep?: boolean }>,
  res: Response
) => {
  console.log(req.query);

  const parsedQuery = userApi.find.parse(req.query);
  console.log(parsedQuery);

  console.log(req.query.streamer);

  //TODO change User model to devide Session from user
  const user = await userService.find({
    where: { nick: parsedQuery.nick },
    include: {
      streamer: parsedQuery.streamer
        ? { include: { activeTokens: true, page: true } }
        : false,
      tipper: parsedQuery.tipper,
      userToken: parsedQuery.userToken,
    },
  });

  return res.status(200).send({ user });
  // if (user) {
  //   // return res.status(200).send({ user: user });
  // } else {
  //   createApiError('Something went wrong.');
  // }
};

const userController = { find };

export { userController };
