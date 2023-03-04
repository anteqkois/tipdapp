import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiClient, TokenApi } from '@tipdapp/api';

const useTokenBasicInfoFind = (query?: TokenApi.FindManyBasicInfo.Query) =>
  useQuery({
    queryKey: ['tokenBasicInfo'],
    queryFn: () => apiClient.token.findManyBasicInfo(query),
    suspense: true,
    retry: false,
  });

const useTokenfindMany = (
  query?: TokenApi.FindMany.Query,
  // options?: { enabled?: boolean }
  options?: Omit<UseQueryOptions, 'initialData' | 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['token'],
    queryFn: () => apiClient.token.findMany(query),
    suspense: true,
    retry: false,
    enabled: options?.enabled,
  });

export { useTokenBasicInfoFind, useTokenfindMany };
