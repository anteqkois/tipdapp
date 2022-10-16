import { UserPageFormObject } from '@/validation/userPage.validation';
import { api } from './apiConfig';

export const update = async (body: UserPageFormObject) => {
  return await api.put('/page', body);
};
