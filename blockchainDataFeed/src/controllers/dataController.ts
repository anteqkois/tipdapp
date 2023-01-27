import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { cryptocurrencyService } from '../services/cryptocurrencyService';
import { DataApi } from '../validation/dataApi';

const tokensData = async (req: Request<DataApi.Find.Params>, res: Response) => {
  // console.log(req.params.coin);
  const data = await cryptocurrencyService.dataFeed();

  res.status(StatusCodes.OK).json({ coins: data });
};

const tokenData = async (req: Request<DataApi.Find.Params>, res: Response) => {
  // console.log(req.params.coin);
  const data = await cryptocurrencyService.dataFeed();

  res.status(StatusCodes.OK).json({ coins: data });
};

export const dataController = {
  tokensData,
  tokenData,
};
