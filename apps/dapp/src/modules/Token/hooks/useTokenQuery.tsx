import { find, findMany } from '@/api/token';
import { useQuery } from '@tanstack/react-query';
import { TokenApi } from '@tipdapp/database';

const useTokenFind = (query?: TokenApi.Find.Query) =>
  useQuery({
    queryKey: ['tokenBasicInfo'],
    queryFn: () => find(query),
    suspense: true,
    retry: false,
  });
const useTokenfindMany = (query?: { symbol?: string[] }) =>
  useQuery({
    queryKey: ['token'],
    queryFn: () => findMany(query),
    suspense: true,
    retry: false,
  });

export { useTokenFind, useTokenfindMany };
