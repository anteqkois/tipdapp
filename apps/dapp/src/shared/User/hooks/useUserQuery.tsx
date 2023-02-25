import { useQuery } from '@tanstack/react-query';
import { apiClient, UserApi } from '@tipdapp/api';

export const useUserFind = (queryParams: UserApi.Find.Query) =>
  useQuery({
    queryKey: ['user'],
    queryFn: () => apiClient.user.find(queryParams),
    suspense: true,
    retry: false,
  });
