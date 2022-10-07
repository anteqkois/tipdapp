import { api, errorHandler } from './apiConfig.js';

export const create = errorHandler(async (body) => await api.post('/userToken', body));
