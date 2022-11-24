import { NextFunction, Request, Response } from 'express';
import { requestLogger } from '../config/logger';

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  requestLogger.info('incoming request', {
    url: req.originalUrl,
    method: req.method,
    host: req.hostname,
  });
  next();
};
