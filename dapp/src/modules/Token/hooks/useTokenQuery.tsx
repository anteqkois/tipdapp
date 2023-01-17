import { find } from '@/api/token';
import { useQuery } from '@tanstack/react-query';
import { TokenApi } from '@tipdapp/server';

export function useTokenFind(query?: TokenApi.Find.Query) {
  return useQuery({
    queryKey: ['tip'],
    queryFn: () => find(query),
    suspense: true,
    retry: false,
  });
}
