import { createApiError } from '@middlewares/error';
import { tipperService } from '@services/tipperService';
import { tipperApi, TipperApi } from '../validation/tipperApi';

const find = async (req: TipperApi.Find.Req, res: TipperApi.Find.Res) => {
  const { query } = tipperApi.find.parse({ ...req });
  const tipper = await tipperService.find({
    where: { nick: query.nick, address: query.address },
    include: {
      tips: query.include?.tips,
      _count: query.include?._count,
    },
  });

  return res.status(200).send({ tipper: tipper });
};

const create = async (req: TipperApi.Create.Req, res: TipperApi.Create.Res) => {
  const { body } = tipperApi.create.parse({ ...req });

  const tipper = await tipperService.create({
    address: body.address,
    nick: body.nick,
  });

  if (tipper) {
    return res.status(200).send({ tipper });
  } else {
    createApiError('Something went wrong.');
  }
};

export const tipperController = { find, create };
