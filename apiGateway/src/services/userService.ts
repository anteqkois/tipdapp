import { UserApi } from '@tipdapp/database';
import { databaseApi } from '../config/apiConfig';

const find = <R = any>(query: UserApi.Find.Query) => {
  return databaseApi.get<never, R>('user', { params: query });
};
export const userService = { find };
