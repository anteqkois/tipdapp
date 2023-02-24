import { TipperApi } from '../validation';
import { api } from './axiosConfig';

const find = <R = TipperApi.Find.ResBody>(query: TipperApi.Find.Query) =>
  api.get<never, R>('tipper', { params: query });

const create = (body: TipperApi.Find.Query) =>
  api.post<never, TipperApi.Create.ResBody>('tipper', { body });

const tipper = { find, create };

export { tipper };
