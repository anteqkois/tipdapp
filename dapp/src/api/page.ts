import { Page, PageValidation } from '@tipdapp/server';
import { api } from './apiConfig';

export type FindParams = {
  nick: string;
};

type FindResponse = {
  pages: Page[];
};

export const find = async (queryParams: FindParams) => {
  return await api.get<never, FindResponse>('/page', { params: queryParams });
};

export const update = async (body: PageValidation.Update) => {
  return await api.put('/page', body);
};
