import { userTokenService } from '../services/userTokenService';
import { UserTokenApi } from '../validation/userTokenApi';
import { userTokenValidation } from '../validation/userTokenValidation';

const find = async (req: UserTokenApi.Find.Req, res: UserTokenApi.Find.Res) => {
  // TODO! make req.query validation ! to prevent hack

  const userToken = await userTokenService.find(req.query);

  if (userToken) {
    return res.status(200).send({ userToken });
  }
  // createApiError('No token found.', 404);
};

const create = async (
  req: UserTokenApi.Create.Req,
  res: UserTokenApi.Create.Res
) => {
  const { address, chainId, name, symbol, txHash, userAddress } =
    userTokenValidation.createParse(req.body);

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
