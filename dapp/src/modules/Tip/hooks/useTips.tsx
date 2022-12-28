import { find } from '@/api/tips';
import { useQuery } from '@tanstack/react-query';

type UseTipsProps = {
  page?: number;
  pageSize?: number;
};

export function useTips({ page = 1, pageSize = 50 }: UseTipsProps) {
  return useQuery({
    queryKey: ['tip', page, pageSize],
    queryFn: () => find({ page, pageSize }),
    suspense: true,
    retry: false,
  });
}

type UseTipsPaginantedProps = {
  page: number;
  pageSize: number;
};

export const useTipsPaginated = ({ page, pageSize }: UseTipsPaginantedProps) =>
  useQuery({
    queryKey: ['tip', page, pageSize],
    queryFn: () => find({ page, pageSize }),
    keepPreviousData: true,
    suspense: true,
    retry: false,
  });
