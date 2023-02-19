import { UserApi } from '@tipdapp/database';
import { databaseApi } from '../config/apiConfig';

const find = async <R = unknown>(query: UserApi.Find.Query) => databaseApi.get<never, R>('user', { params: query });

const create = async (body: UserApi.Create.Body) => databaseApi.post<never, UserApi.Create.ResBody>('user', body);

export const userService = { find, create };
