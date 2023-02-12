import { find } from '@/api/user';
import { useQuery } from '@tanstack/react-query';
import { UserApi } from '@tipdapp/database';

type UseTipsProps = {
  queryParams: UserApi.Find.Query;
};

export const useUserFind = ({ queryParams }: UseTipsProps) =>
  useQuery({
    queryKey: ['user'],
    queryFn: () => find(queryParams),
    suspense: true,
    retry: false,
  });
