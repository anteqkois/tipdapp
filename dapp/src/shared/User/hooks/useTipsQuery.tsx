import { find } from '@/api/user';
import { useQuery } from '@tanstack/react-query';
import { Address } from 'wagmi';

type UseTipsProps = {
  address: Address
};

export function useUserFind({ address }: UseTipsProps) {
  return useQuery({
    queryKey: ['user', address],
    queryFn: () => find({ page, pageSize }),
    suspense: true,
    retry: false,
  });
}
