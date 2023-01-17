import { Token } from '@prisma/client';
import { tokenService } from '@services/tokenService';
import { Request, Response } from 'express';
import { createApiError } from '../middlewares/error';
import { tokenApi, TokenApi } from '../validation/tokenApi';

const find = async (
  req: Request<{}, {}, {}, TokenApi.Find.Query>,
  res: Response<TokenApi.Find.Response>
) => {
  const parsedQuery = tokenApi.find.query.parse(req.query);

  const tokens = await tokenService.findMany({
    where: {
      chainId: parsedQuery.chainId,
      name: parsedQuery.name,
      symbol: parsedQuery.symbol,
    },
  });

  if (tokens) {
    return res.status(200).send({ tokens });
  } else {
    //TODO other error message
    createApiError('No tokens found.', 404);
  }
};

export const tokenController = { find };
