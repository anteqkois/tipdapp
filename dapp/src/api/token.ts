import { TokenCoinGecko } from '@/modules/Token/types';
import { TokenApi } from '@tipdapp/server';
import axios from 'axios';
import { api } from './apiConfig';

export const find = async (queryParams?: TokenApi.Find.Query) =>
  api.get<never, TokenApi.Find.Response>('tokenInfo', {
    params: queryParams,
  });

export const getDetails = async (queryParams?: { symbol: string[] }) =>
  api.get<never, { tokens: TokenCoinGecko[] }>(
    'http://localhost:3002/api/token',
    {
      params: queryParams,
    }
  );
