import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { cryptocurrencyService } from '../services/tokenService';
import { TokenApi, tokenApi } from '../validation/tokenApi';

const tokens = async (req: Request<{}, {}, {}, TokenApi.FindMany.Query>, res: Response) => {
  const parsedQuery = tokenApi.findMany.query.parse(req.query);

  const data = await cryptocurrencyService.getTokens(parsedQuery?.symbol);

  res.status(StatusCodes.OK).json({ tokens: data });
};

const token = async (req: Request<TokenApi.Find.Params>, res: Response) => {
  const parsedParams = tokenApi.find.params.parse(req.params);

  const data = await cryptocurrencyService.getToken(parsedParams.symbol);

  res.status(StatusCodes.OK).json({ data });
};

export const tokenController = {
  tokens,
  token,
};
