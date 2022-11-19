import { createApiError } from '../middlewares/error.js';
import { UserToken } from '../services/userTokenService.js';
import { userTokenValidation } from '../validation/userTokenValidation.old.js';

const find = async (req, res) => {
  //TODO! make req.query validation ! to prevent hack

  const token = UserToken.find({ where: req.query });

  if (token) {
    return res.status(200).send({ token });
  } else {
    createApiError('No token found.', 404);
  }
};

const create = async (req, res) => {
  userTokenValidation.createBody.parse(req.body);

  const token = await UserToken.create(req.body);

  console.log('create new token', token);
  return res.status(200).send({ token });
};

export { find, create };
export default {
  find,
  create,
};
