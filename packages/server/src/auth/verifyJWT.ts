import { createApiError } from '@tipdapp/api';
import { DecodedUser } from '@tipdapp/types';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { dotenvConfig } from '../config';
import { errorLogger } from '../logger';

dotenvConfig();

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const { authToken, authStatus } = req.cookies;

  if (authToken === null || authToken === undefined) {
    authStatus &&
      res.cookie('authStatus', 'unauthenticated', {
        maxAge: 60 * 60 * 1000,
      });
    createApiError(`You are not authorized.`, StatusCodes.UNAUTHORIZED);
  }
  try {
    if (!process.env.JWT_TOKEN_SECRET) {
      errorLogger.error(
        "Missing env, set JWT_TOKEN_SECRET environment in your .env file. Without it server can't validate JSON Web Token"
      );
      process.exit(1);
    }
    const decoded = jwt.verify(
      authToken,
      process.env.JWT_TOKEN_SECRET
    ) as unknown as DecodedUser;

    req.user = decoded;
    next();
  } catch (error) {
    // TODO remove session?
    // userService.removeSession({ ip: req.ip });
    res.cookie('authStatus', 'unauthenticated', {
      maxAge: 60 * 60 * 1000,
    });

    res.redirect(`${process.env.FRONTEND_URL}/login`);
    // createApiError(`Invalid authentication token.`, StatusCodes.BAD_REQUEST);
  }
};

export { verifyJWT };
