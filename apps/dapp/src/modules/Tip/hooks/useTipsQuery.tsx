import { find } from '@/api/tips';
import { useQuery } from '@tanstack/react-query';

type UseTipsProps = {
  page?: number;
  pageSize?: number;
};

const useTipsFind = ({ page = 1, pageSize = 50 }: UseTipsProps) =>
  useQuery({
    queryKey: ['tip', page, pageSize],
    queryFn: () => find({ page, pageSize }),
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
    queryFn: () => find({ page, pageSize }),
    keepPreviousData: true,
    suspense: true,
    retry: false,
  });

export { useTipsFind, useTipsFindPaginated };
