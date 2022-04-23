const { createApiError } = require('./error');
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const { JWT } = req.cookies;

  if(JWT == null || JWT == undefined)createApiError(`You are not authorized.`, 401);

  jwt.verify(JWT, process.env.JWT_TOKEN_SECRET, (err, user) => {
    if(err)createApiError(`Wrong authentication token.`, 403);
    req.user = user;
    next();
  });
};

module.exports = {
  authenticate,
};
