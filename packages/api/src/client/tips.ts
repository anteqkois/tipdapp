import { TipApi } from '../validation';
import { api } from './axiosConfig';

const find = async (queryParams: TipApi.FindByAddress.Query) =>
  api.get<never, TipApi.FindByAddress.ResBody>('tip', {
    params: queryParams,
  });

const signature = async (body: TipApi.Signature.Body) =>
  api.post<never, TipApi.Signature.ResBody>('tip/signature', body);

const tips = { find, signature };

export { tips };
