import { useQuery } from '@tanstack/react-query';
import { apiClient, TokenApi } from '@tipdapp/api';

const useTokenFind = (query?: TokenApi.FindBasicInfo.Query) =>
  useQuery({
    queryKey: ['tokenBasicInfo'],
    queryFn: () => apiClient.token.findBasicInfo(query),
    suspense: true,
    retry: false,
  });

const useTokenfindMany = (query?: TokenApi.FindMany.Query) =>
  useQuery({
    queryKey: ['token'],
    queryFn: () => apiClient.token.findMany(query),
    suspense: true,
    retry: false,
  });

export { useTokenFind, useTokenfindMany };
