import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { cryptocurrencyService } from '../services/tokenService';
import { DataApi } from '../validation/dataApi';

const tokens = async (req: Request<DataApi.Find.Params>, res: Response) => {
  const data = await cryptocurrencyService.getTokens();

  res.status(StatusCodes.OK).json({ tokens: data });
};

const token = async (req: Request<DataApi.Find.Params>, res: Response) => {
  // console.log(req.params.coin);
  const data = await cryptocurrencyService.getTokens();

  res.status(StatusCodes.OK).json({ coins: data });
};

export const tokenController = {
  tokens,
  token,
};
