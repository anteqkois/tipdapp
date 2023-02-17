import { Prisma } from '@prisma/client';
import { pageService } from '@services/pageService';
import { userService } from '@services/userService';
import { createApiError } from '@tipdapp/api';
import { StatusCodes } from 'http-status-codes';
import { PageApi, pageApi } from '../validation/pageApi';

const findByAffixUrl = async (
  req: PageApi.FindByAffixUrl.Req,
  res: PageApi.FindByAffixUrl.Res
) => {
  const { params } = pageApi.findByAffixUrl.parse({ ...req });

  const page = await pageService.find({
    where: {
      AND: [{ affixUrl: params.affixUrl }, { role: params.role }],
    },
    include: {
      [params.role]: true,
    },
  });

  const user = await userService.find({
    where: { [params.role]: { pageAffixUrl: params.affixUrl } },
  });

  if (page) {
    return res.status(StatusCodes.OK).send({ page, user });
  }
  // createApiError('Page not found for this role and affix.');
  return createApiError('Page not found for this role and affix.');
};

const update = async (req: PageApi.Update.Req, res: PageApi.Update.Res) => {
  // const parsedParams = pageApi.update.body.parse(req.body);
  const { body } = pageApi.update.parse({ ...req });

  const arrayOfObjectWithTokenNames = body.tokenAddresses.map(
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
      description: body.description,
      // TODO in future make it dynamic to update streamer, charity and other type users active tokens
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
