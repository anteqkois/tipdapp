import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DataApi } from '../validation/dataApi';

const coinData = (req: Request<DataApi.Find.Params>, res: Response) => {
  console.log(req.params.coin);

  res.status(StatusCodes.OK).json({ test: 'wedjbnueinowd' });
};

export const dataController = {
  coinData,
};
