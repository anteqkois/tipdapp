import { DecodedUser } from '@types';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { createApiError } from './error';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const { authToken, authStatus } = req.cookies;

  if (authToken === null || authToken === undefined) {
    authStatus &&
      res.cookie('authStatus', 'unauthenticated', {
        maxAge: 60 * 60 * 1000,
      });
    createApiError(`You are not authorized.`, StatusCodes.UNAUTHORIZED);
  }

  try {
    const decoded = jwt.verify(
      authToken,
      process.env.JWT_TOKEN_SECRET
    ) as DecodedUser;

    req.user = decoded;
    next();
  } catch (error) {
    createApiError(`Invalid authentication token.`, StatusCodes.BAD_REQUEST);
  }
};

export { authenticate };
