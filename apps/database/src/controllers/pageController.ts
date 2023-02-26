import { pageService } from '@services/pageService';
import { userService } from '@services/userService';
import { createApiError, HttpStatusCode, pageApi, PageApi } from '@tipdapp/api';
import { Prisma } from '@tipdapp/prisma';
import { NestedPage, NestedUser } from '@tipdapp/types';

const findByAffixUrl = async (
  req: PageApi.FindByAffixUrl.Req,
  res: PageApi.FindByAffixUrl.Res
) => {
  const { params } = pageApi.findByAffixUrl.parse({ ...req });

  const page = (await pageService.find({
    where: {
      AND: [{ affixUrl: params.affixUrl }, { role: params.role }],
    },
    include: {
      [params.role]: true,
    },
  })) as NestedPage;

  const user = (await userService.find({
    where: { [params.role]: { pageAffixUrl: params.affixUrl } },
  })) as NestedUser;

  if (page) {
    return res.status(HttpStatusCode.Ok).send({ page, user });
  }
  // createApiError('Page not found for this role and affix.');
  return createApiError('Page not found for this role and affix.');
};

const update = async (req: PageApi.Update.Req, res: PageApi.Update.Res) => {
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
    .status(HttpStatusCode.Ok)
    .send({ message: 'Your page was successfully updated' });
};

export const pageController = { findByAffixUrl, update };
