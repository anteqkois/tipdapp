import { findByAffixUrl } from '@/api/page';
import { useQuery } from '@tanstack/react-query';

export const usePageFindByAffixUrl = (
  body: Pick<Parameters<typeof findByAffixUrl>, '0'>['0']
) =>
  useQuery({
    queryKey: ['page', body.params.role, body.params.affixUrl],
    queryFn: () => findByAffixUrl(body),
    keepPreviousData: true,
    suspense: true,
    retry: false,
  });
