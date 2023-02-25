import { useQuery } from '@tanstack/react-query';
import { apiClient, PageApi } from '@tipdapp/api';

export const usePageFindByAffixUrl = (
  params: PageApi.FindByAffixUrl.Params,
  queryParams?: PageApi.FindByAffixUrl.Query
) =>
  useQuery({
    queryKey: ['page', params.role, params.affixUrl],
    queryFn: () => apiClient.page.findByAffixUrl({ params, queryParams }),
    keepPreviousData: true,
    suspense: true,
    retry: false,
  });
