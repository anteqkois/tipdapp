import { TipperApi } from '../validation';
import { api } from './axiosConfig';

const find = <R = TipperApi.Find.ResBody>(
  query: TipperApi.Find.Query,
  baseURL?: string
) => api.get<never, R>('tipper', { params: query, baseURL });

const create = (body: TipperApi.Find.Query, baseURL?: string) =>
  api.post<never, TipperApi.Create.ResBody>('tipper', { body, baseURL });

const tipper = { find, create };

export { tipper };
