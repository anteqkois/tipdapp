import { createApiError } from '@middlewares/error';
import { Prisma } from '@prisma/client';
import { pageService } from '@services/pageService';
import { userService } from '@services/userService';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PageApi, pageApi } from '../validation/pageApi';

const findByAffixUrl = async (
  req: Request<
    PageApi.FindByAffixUrl.Params,
    {},
    {},
    PageApi.FindByAffixUrl.Query
  >,
  res: Response
) => {
  const parsedParams = pageApi.findByAffixUrl.params.parse(req.params);
  const parsedQuery = pageApi.findByAffixUrl.query.parse(req.query);

  const page = await pageService.find({
    where: {
      AND: [{ affixUrl: parsedParams.affixUrl }, { role: parsedParams.role }],
    },
    include: {
      [parsedParams.role]: true,
    },
  });

  const user = await userService.find({
    where: { [parsedParams.role]: { pageAffixUrl: parsedParams.affixUrl } },
  });

  if (page) {
    return res.status(StatusCodes.OK).send({ page, user });
  } else {
    createApiError('Page not found for this role and affix.');
  }
};

const update = async (
  req: Request<{}, {}, PageApi.Update.Body>,
  res: Response
) => {
  const parsedParams = pageApi.update.body.parse(req.body);

  const arrayOfObjectWithTokenNames = parsedParams.tokenAddresses.map(
    (address) =>
      ({
        address,
      } as Prisma.TokenWhereUniqueInput)
  );

  await pageService.update({
    where: {
      role_affixUrl: { affixUrl: req.user.nick, role: req.user.activeRole },
    },
    data: {
      description: parsedParams.description,
      //TODO in future make it dynamic to update streamer, charity and other type users active tokens
      streamer: {
        update: {
          activeTokens: {
            set: arrayOfObjectWithTokenNames,
          },
        },
      },
    },
  });

  res
    .status(StatusCodes.CREATED)
    .send({ message: 'Your page was successfully updated' });
};

export const pageController = { findByAffixUrl, update };
