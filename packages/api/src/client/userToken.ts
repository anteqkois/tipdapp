import { UserTokenApi } from '../validation';
import { api } from './axiosConfig';

const find = async (queryParams?: UserTokenApi.Find.Query) =>
  api.get<never, UserTokenApi.Find.ResBody>('/userToken', {
    params: queryParams,
  });

const create = async (body: UserTokenApi.Create.Body) =>
  api.post<never, UserTokenApi.Create.ResBody>('userToken', body);

const userToken = { find, create };

export { userToken };
