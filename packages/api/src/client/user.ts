import { UserApi } from '../validation';
import { api } from './axiosConfig';

const find = async <R = UserApi.Find.ResBody>(
  queryParams: UserApi.Find.Query
) => api.get<never, R>('/user', { params: queryParams });

const create = async (body: UserApi.Create.Body) =>
  api.post<never, UserApi.Create.ResBody>('user', body);

const user = { find, create };
export { user };
