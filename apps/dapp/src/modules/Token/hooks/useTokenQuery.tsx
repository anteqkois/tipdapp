import { find, getDetails } from '@/api/token';
import { useQuery } from '@tanstack/react-query';
import { TokenApi } from '@tipdapp/database';

const useTokenFind = (query?: TokenApi.Find.Query) =>
  useQuery({
    queryKey: ['tokenInfo'],
    queryFn: () => find(query),
    suspense: true,
    retry: false,
  });
const useTokenGetDetails = (query?: { symbol?: string[] }) =>
  useQuery({
    queryKey: ['token'],
    queryFn: () => getDetails(query),
    suspense: true,
    retry: false,
  });

export { useTokenFind, useTokenGetDetails };
