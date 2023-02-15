import { createApiError, DecodedUser } from '@tipdapp/server';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const { authToken, authStatus } = req.cookies;

  if (authToken === null || authToken === undefined) {
    authStatus &&
      res.cookie('authStatus', 'unauthenticated', {
        maxAge: 60 * 60 * 1000,
      });
    // userService.removeSession({ ip: req.ip });
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
    // userService.removeSession({ ip: req.ip });
    res.cookie('authStatus', 'unauthenticated', {
      maxAge: 60 * 60 * 1000,
    });
    // res.redirect(process.env.FRONTEND_URL + '/login');
    createApiError(`Invalid authentication token.`, StatusCodes.BAD_REQUEST);
  }
};

export { verifyJWT };
