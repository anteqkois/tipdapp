import { TipApi } from '../validation';
import { api } from './axiosConfig';

const find = async (queryParams: TipApi.FindByAddress.Query) =>
  api.get<never, TipApi.FindByAddress.ResBody>('tip', {
    params: queryParams,
  });

const tips = { find}

export { tips };
