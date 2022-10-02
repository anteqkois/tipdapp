import { api } from './apiConfig.js';

export const create = async (body) => await api.post('/user-token', { ...body }).catch((err) => console.log(err));
