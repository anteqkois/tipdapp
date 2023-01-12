'use client';

import { usePageFindByAffixUrl } from '@/modules/Page/hooks/usePageQuery';
import { Role } from '@tipdapp/server';

type Props = {
  params: {
    role: Role;
    affixUrl: string;
  };
};

export default function Page({ params }: Props) {
  const { data, error } = usePageFindByAffixUrl({
    params,
  });

  // console.log(error);
  // console.log(data);
  return (
    <main>
      quasi iure fugit cupiditate alias officiis cum assumenda inventore nobis
      voluptas!
    </main>
  );
}
