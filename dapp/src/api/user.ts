import { NestedUser, Page, PageValidation, UserApi } from '@tipdapp/server';
import { Address } from 'wagmi';
import { api } from './apiConfig';

// export type FindParams = {
//   nick: string

// };

type FindResponse = {
  user: NestedUser
};


// export const find = async (queryParams: FindParams) => {
//   return await api.get<never, FindResponse>('/user', { params: queryParams });
// };
export const find = async (queryParams: UserApi.Find.Query) => {
  return await api.get<never, FindResponse>('/user', { params: queryParams });
};

// export const update = async (body: PageValidation.Update) => {
//   return await api.put('/page', body);
// };
