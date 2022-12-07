import { Tip, TipUI } from '@anteqkois/server';
import { api } from './apiConfig';

type FindParams = {
  page?: number;
  pageSize?: number;
};

type FindResponse = {
  tips: TipUI[];
  count: number;
};

export const find = async (queryParams: FindParams) =>
  await api.get<never, FindResponse>('tip', {
    params: queryParams,
  });
