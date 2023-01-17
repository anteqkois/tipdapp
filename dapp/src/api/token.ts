import { TokenApi } from '@tipdapp/server';
import { api } from './apiConfig';

export const find = async (queryParams?: TokenApi.Find.Query) =>
  await api.get<never, TokenApi.Find.Response>('token', {
    params: queryParams,
  });
