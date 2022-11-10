import { api } from './apiConfig';

type FindParams = {
  page?: number;
  pageSize?: number;
};

type Tip = any;

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

export const find = async (params: FindParams) =>
  await api.get<never, FindResponse>('tip', {
    params,
  });
