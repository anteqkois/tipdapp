import { api } from './apiConfig';

// use get with queryParams
export const validateFormData = async (body) => {
  return await api.post('/auth/validate', body);
};
