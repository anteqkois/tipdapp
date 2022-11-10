import { find } from '@/api/tips';
import { useQuery } from '@tanstack/react-query';

export const useTips = () =>
  useQuery({
    queryKey: ['tip'],
    queryFn: () => find({ page: 1, pageSize: 50 }),
    suspense: true,
    retry: false,
  });

type UseTipsPaginantedProps = {
  page: number;
  pageSize: number
};
export const useTipsPaginated = ({ page, pageSize }: UseTipsPaginantedProps) =>
  useQuery({
    queryKey: ['tip', page],
    queryFn: () => find({ page, pageSize }),
    keepPreviousData: true,
    suspense: true,
    retry: false,
  });
