import { UserPageFormObject } from '@/validation/userPageValidation';
import { api } from './apiConfig';

export const update = async (body: UserPageFormObject) => {
  return await api.put('/page', body);
};
