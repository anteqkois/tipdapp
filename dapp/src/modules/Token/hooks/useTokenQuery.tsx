import { find, getDetails } from '@/api/token';
import { useQuery } from '@tanstack/react-query';
import { TokenApi } from '@tipdapp/server';

export function useTokenFind(query?: TokenApi.Find.Query) {
  return useQuery({
    queryKey: ['tokenInfo'],
    queryFn: () => find(query),
    suspense: true,
    retry: false,
  });
}
export function useTokenGetDetails(query?: { tokenSymbol: string[] }) {
  return useQuery({
    queryKey: ['token'],
    queryFn: () => getDetails(query),
    suspense: true,
    retry: false,
  });
}
