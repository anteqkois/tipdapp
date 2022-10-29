import jwt from 'jsonwebtoken';
import { createApiError } from './error.js';

const authenticate = (req, res, next) => {
  const { authToken } = req.cookies;

  if (authToken == null || authToken == undefined) createApiError(`You are not authorized.`, 401);
  jwt.verify(authToken, process.env.JWT_TOKEN_SECRET, (err, data) => {
    if (err) createApiError(`Wrong authentication token.`, 403);
    req.jwtData = data;
    next();
  });
};

export { authenticate };
export default {
  authenticate,
};
