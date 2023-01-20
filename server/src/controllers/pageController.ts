import { createApiError } from '@middlewares/error';
import { pageService } from '@services/pageService';
import { userService } from '@services/userService';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Prisma } from '../../package/lib/esm/package';
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
    // include:{'Streamer': true}
    // include: { [t]: true },
    // include: { [parsedParams.role]:  },
    // include: { streamer: { include: { user: true, activeTokens: true } } },
    include: {
      // [parsedParams.role]: { include: { user: true, activeTokens: true } },
      // [parsedParams.role]: { include: { activeTokens: true } },
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

const update = async (req: Request<PageApi.Update.Params>, res: Response) => {
  // const
  // const parsedData = pageValidation.updateParse(req.body);
  const parsedParams = pageApi.update.params.parse(req.params);

  const arrayOfObjectWithTokenNames = parsedParams.tokens.map((token) => ({
    name: token,
  })) as Prisma.TokenWhereUniqueInput;

  await pageService.update({
    where: {
      role_affixUrl: { affixUrl: req.user.nick, role: req.user.activeRole },
    },
    data: {
      description: parsedParams.description,
      streamer: {
        update: {
          activeTokens: {
            connect: [arrayOfObjectWithTokenNames],
          },
        },
      },
    },
  });

  // //! TODO implement role based auth
  // switch (req.user.activeRole) {
  //   case 'streamer':
  //     await pageService.update({
  //       where: { streamer: { some: { address: req.user.address } } },
  //       data: parsedData,
  //     });
  //     break;
  //   default:
  //     createApiError(
  //       "Change active role. The currently selected can't have a page",
  //       StatusCodes.FORBIDDEN
  //     );
  //     break;
  // }

  res.status(StatusCodes.CREATED).send({ message: 'Page was updated' });
};

export const pageController = { findByAffixUrl, update };
