import { TokenApi } from '../validation';
import { api } from './axiosConfig';

const findBasicInfo = async (queryParams?: TokenApi.FindBasicInfo.Query) =>
  api.get<never, TokenApi.FindBasicInfo.ResBody>('tokenBasicInfo', {
    params: queryParams,
  });

const findMany = async (queryParams?: TokenApi.FindMany.Query) =>
  api.get<never, TokenApi.FindMany.ResBody>('token', {
    params: queryParams,
  });

const token = { findBasicInfo, findMany };

export { token };
