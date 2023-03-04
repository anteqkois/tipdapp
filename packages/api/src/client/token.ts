import { TokenApi } from '../validation';
import { api } from './axiosConfig';

const findManyBasicInfo = async (
  queryParams?: TokenApi.FindManyBasicInfo.Query
) =>
  api.get<never, TokenApi.FindManyBasicInfo.ResBody>('tokenBasicInfo', {
    params: queryParams,
  });

const findMany = async (queryParams?: TokenApi.FindMany.Query) =>
  api.get<never, TokenApi.FindMany.ResBody>('token', {
    params: queryParams,
  });

const token = { findManyBasicInfo, findMany };

export { token };
