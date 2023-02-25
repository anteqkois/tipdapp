import { TipperApi, UserApi } from '@tipdapp/api';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002/api',
  withCredentials: true,
});

api.interceptors.response.use(
  (data) => Promise.resolve(data.data),
  (err) => Promise.reject(err.response?.data.error)
);

// In ApiGateway can't be use apiClient from package, becouse it's create reetrency (it's send request to api-gateway from api-gateway)
// In this file I created basic api client to use in api-gateway
const findUser = async <R = UserApi.Find.ResBody>(
  queryParams: UserApi.Find.Query
) => api.get<never, R>('/user', { params: queryParams });

const createUser = async (body: UserApi.Create.Body) =>
  api.post<never, UserApi.Create.ResBody>('user', body);

const user = { find: findUser, create: createUser };

const findTipper = <R = TipperApi.Find.ResBody>(query: TipperApi.Find.Query) =>
  api.get<never, R>('tipper', { params: query });

const createTipper = (body: TipperApi.Find.Query) =>
  api.post<never, TipperApi.Create.ResBody>('tipper', { body });

const tipper = { find: findTipper, create: createTipper };

const apiAuth = { user, tipper };

export { apiAuth };
