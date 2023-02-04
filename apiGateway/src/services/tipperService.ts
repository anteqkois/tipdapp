import { TipperApi, UserApi } from '@tipdapp/database';
import { databaseApi } from '../config/apiConfig';

const find = <R = any>(query: TipperApi.Find.Query) => {
  return databaseApi.get<never, R>('tipper', { params: query });
};

const create = (body: TipperApi.Find.Query) => {
  return databaseApi.post<never, TipperApi.Create.ResBody>('tipper', { body });
};
export const tipperService = { find, create };
