import { userTokenApi, UserTokenApi } from '@tipdapp/api';
import { userTokenService } from '../services/userTokenService';

const find = async (req: UserTokenApi.Find.Req, res: UserTokenApi.Find.Res) => {
  const { query } = userTokenApi.find.parse({ ...req });
  const userToken = await userTokenService.find({ ...query });

  if (userToken) {
    return res.status(200).send({ userToken });
  }
  // createApiError('No token found.', 404);
};

const create = async (
  req: UserTokenApi.Create.Req,
  res: UserTokenApi.Create.Res
) => {
  const { body } = userTokenApi.create.parse({ ...req });
  const { address, chainId, name, symbol, txHash, userAddress } = body;

  const token = await userTokenService.create({
    address,
    chainId,
    name,
    symbol,
    txHash,
    user: {
      connect: {
        address: userAddress,
      },
    },
  });

  return res.status(200).send({ token });
};

export const userTokenController = { find, create };
