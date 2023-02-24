import { HttpStatusCode, tokenApi, TokenApi } from '@tipdapp/api';
import { Response } from 'express';
import { cryptocurrencyService } from '../services/tokenService';

const tokens = async (req: TokenApi.FindMany.Req, res: Response) => {
  const parsedReq = tokenApi.findMany.parse({ ...req });

  const data = await cryptocurrencyService.getTokens(parsedReq.query.symbol);

  res.status(HttpStatusCode.Ok).json({ tokens: data });
};

const token = async (req: TokenApi.Find.Req, res: Response) => {
  const parsedReq = tokenApi.find.parse({ ...req });

  const data = await cryptocurrencyService.getToken(parsedReq.params.symbol);

  res.status(HttpStatusCode.Ok).json({ data });
};

export const tokenController = {
  tokens,
  token,
};
