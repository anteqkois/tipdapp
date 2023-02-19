import { TipperApi } from '@tipdapp/database';
import { databaseApi } from '../config/apiConfig';

const find = <R = unknown>(query: TipperApi.Find.Query) => databaseApi.get<never, R>('tipper', { params: query });

const create = (body: TipperApi.Find.Query) => databaseApi.post<never, TipperApi.Create.ResBody>('tipper', { body });
export const tipperService = { find, create };
