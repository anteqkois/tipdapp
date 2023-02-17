import { tipService } from '../services/tipService';
import { tipApi, TipApi } from '../validation/tipApi';

const findByAddress = async (
  req: TipApi.FindByAddress.Req,
  res: TipApi.FindByAddress.Res
) => {
  const { query } = tipApi.findByAddress.parse({ ...req });

  const page = parseInt(query?.page ?? '1', 10);
  const pageSize = parseInt(query?.pageSize ?? '20', 10);

  const skip = (page - 1) * pageSize;

  const count = await tipService.count({
    userAddress: req.user.address,
  });

  const tips = await tipService.findMany({
    skip,
    take: pageSize,
    where: { userAddress: req.user.address },
    include: {
      token: {
        select: {
          name: true,
          symbol: true,
          address: true,
        },
      },
      tipper: {
        select: {
          nick: true,
        },
      },
    },
  });

  if (tips) {
    return res.status(200).send({ tips, count });
  }
  // createApiError('No tips found.', 404);
};

export const tipController = { findByAddress };
