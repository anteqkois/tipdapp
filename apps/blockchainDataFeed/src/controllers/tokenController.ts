import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { cryptocurrencyService } from '../services/tokenService';
import { TokenApi, tokenApi } from '../validation';

const tokens = async (req: TokenApi.FindMany.Req, res: Response) => {
  const parsedReq = tokenApi.findMany.parse({ ...req });

  const data = await cryptocurrencyService.getTokens(parsedReq.query.symbol);

  res.status(StatusCodes.OK).json({ tokens: data });
};

const token = async (req: TokenApi.Find.Req, res: Response) => {
  const parsedReq = tokenApi.find.parse({ ...req });

  const data = await cryptocurrencyService.getToken(parsedReq.params.symbol);

  res.status(StatusCodes.OK).json({ data });
};

export const tokenController = {
  tokens,
  token,
};
