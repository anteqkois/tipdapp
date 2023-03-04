import { tokenService } from '@services/tokenService';
import { tokenApi, TokenApi } from '@tipdapp/api';

const findMany = async (
  req: TokenApi.FindManyBasicInfo.Req,
  res: TokenApi.FindManyBasicInfo.Res
) => {
  const { query } = tokenApi.findManyBasicInfo.parse({ ...req });

  const tokens = await tokenService.findMany({
    where: {
      chainId: query.chainId,
      name: query.name,
      id: { in: query.ids },
    },
  });

  if (tokens) {
    return res.status(200).send({ tokens });
  }
  // TODO other error message
  // createApiError('No tokens found.', 404);
};

export const tokenController = { findMany };
