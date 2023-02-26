import { UserApi } from '../validation';
import { api } from './axiosConfig';

const find = async <R = UserApi.Find.ResBody>(
  queryParams: UserApi.Find.Query,
  baseURL?: string
) => api.get<never, R>('/user', { params: queryParams, baseURL });

const create = async (body: UserApi.Create.Body, baseURL?: string) =>
  api.post<never, UserApi.Create.ResBody>('user', { body, baseURL });

const user = { find, create };
export { user };
