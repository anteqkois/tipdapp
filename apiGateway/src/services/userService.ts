import { UserApi } from '@tipdapp/database';
import { databaseApi } from '../config/apiConfig';

const find = async <R = any>(query: UserApi.Find.Query) => {
  return databaseApi.get<never, R>('user', { params: query });
};

const create = async (body: UserApi.Create.Body) => {
  return databaseApi.post<never, UserApi.Create.ResBody>('user', { body });
};

export const userService = { find, create };
