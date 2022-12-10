import { find, FindParams } from '@/api/page';
import { useQuery } from '@tanstack/react-query';

// type UseTipsPaginantedProps = {
//   nick: string;
// };

export const usePageFind = ({ nick }: FindParams) =>
  useQuery({
    queryKey: ['page', nick],
    queryFn: () => find({ nick }),
    keepPreviousData: true,
    suspense: true,
    retry: false,
  });
