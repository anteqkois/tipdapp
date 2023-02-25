import { useQuery } from '@tanstack/react-query';
import { apiClient, TipApi } from '@tipdapp/api';

const useTipsFind = (queryParams: TipApi.FindByAddress.Query) =>
  useQuery({
    queryKey: ['tip', queryParams?.page, queryParams?.pageSize],
    queryFn: () => apiClient.tips.find(queryParams),
    suspense: true,
    retry: false,
  });

type UseTipsPaginantedProps = {
  page: number;
  pageSize: number;
};

const useTipsFindPaginated = ({ page, pageSize }: UseTipsPaginantedProps) =>
  useQuery({
    queryKey: ['tip', page, pageSize],
    queryFn: () => apiClient.tips.find({ page, pageSize }),
    keepPreviousData: true,
    suspense: true,
    retry: false,
  });

export { useTipsFind, useTipsFindPaginated };
