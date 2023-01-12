import { NestedUser, UserApi } from '@tipdapp/server';
import { api } from './apiConfig';

type FindResponse = {
  user: NestedUser;
};

export const find = async (queryParams: UserApi.Find.Query) => {
  return await api.get<never, FindResponse>('/user', { params: queryParams });
};
