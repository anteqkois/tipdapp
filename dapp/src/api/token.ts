import { TokenApi } from '@tipdapp/server';
import axios from 'axios';
import { api } from './apiConfig';

export const find = async (queryParams?: TokenApi.Find.Query) =>
  api.get<never, TokenApi.Find.Response>('tokenInfo', {
    params: queryParams,
  });

export const getDetails = async (queryParams?: { tokenSymbol: string[] }) =>
  axios.get<never, TokenApi.Find.Response>('http://localhost:3002/api/token', {
    params: queryParams,
  });
