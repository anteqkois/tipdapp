import jwt from 'jsonwebtoken';
import { createApiError } from './error.js';

const authenticate = (req, res, next) => {
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
  jwt.verify(authToken, process.env.JWT_TOKEN_SECRET, (err, data) => {
    if (err) createApiError(`Invalid authentication token.`, 403);
    req.user = { roles: data.roles, ...data.metadata };
    next();
  });
};

export { authenticate };
