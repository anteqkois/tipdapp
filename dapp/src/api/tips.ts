import { api } from './apiConfig';

type Tip = any;

type FindParams = {
  page?: number;
  pageSize?: number;
};

type FindResponse = {
  tips: (Tip & {
    token: {
      symbol: string;
      name: string;
    };
    tipper: {
      nick: string;
    };
  })[];
  count: number;
};

export const find = async (queryParams: FindParams) =>
  await api.get<never, FindResponse>('tip', {
    params: queryParams,
  });
