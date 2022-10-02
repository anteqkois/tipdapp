import { api, errorHandler } from './apiConfig.js';

export const create = errorHandler(async (body) => await api.post('/user-token', { ...body }));
