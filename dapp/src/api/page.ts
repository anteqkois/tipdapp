import { UserPageValidation } from '@anteqkois/server';
import { api } from './apiConfig';

export const update = async (body: UserPageValidation.Create) => {
  return await api.put('/page', body);
};