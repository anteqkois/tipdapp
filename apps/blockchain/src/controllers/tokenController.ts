import { HttpStatusCode, tokenApi, TokenApi } from '@tipdapp/api';
import { Response } from 'express';
import { tokenService } from '../services/tokenService';

const findMany = async (req: TokenApi.FindMany.Req, res: Response) => {
  const parsedReq = tokenApi.findMany.parse({ ...req });

  const data = await tokenService.getTokens(parsedReq.query.ids);

  res.status(HttpStatusCode.Ok).json({ tokens: data });
};

const find = async (req: TokenApi.Find.Req, res: Response) => {
  const parsedReq = tokenApi.find.parse({ ...req });

  const data = await tokenService.getToken(parsedReq.params.id);

  res.status(HttpStatusCode.Ok).json({ data });
};

export const tokenController = {
  findMany,
  find,
};
