import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { DecodedUser } from 'src/types';
import { createApiError } from './error';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const { authToken, authStatus } = req.cookies;

  if (authToken === null || authToken === undefined) {
    authStatus &&
      res.cookie('authStatus', 'unauthenticated', {
        maxAge: 60 * 60 * 1000,
      });
    // return res.status(err.status || 500).send({ error: [err] });
    // res.redirect(req.get('referer'));
    createApiError(`You are not authorized.`, 401);
  }

  try {
    const decoded = jwt.verify(
      authToken,
      process.env.JWT_TOKEN_SECRET
    ) as DecodedUser;

    req.user = decoded;
    next();
  } catch (error) {
    createApiError(`Invalid authentication token.`, 403);
  }
};

export { authenticate };
