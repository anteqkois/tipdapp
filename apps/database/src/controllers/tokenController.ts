import { tokenService } from '@services/tokenService';
import { tokenApi, TokenApi } from '../validation/tokenApi';

const find = async (req: TokenApi.Find.Req, res: TokenApi.Find.Res) => {
  const { query } = tokenApi.find.parse({ ...req });

  const tokens = await tokenService.findMany({
    where: {
      chainId: query.chainId,
      name: query.name,
      symbol: query.symbol,
    },
  });

  if (tokens) {
    return res.status(200).send({ tokens });
  }
  // TODO other error message
  // createApiError('No tokens found.', 404);
};

export const tokenController = { find };
