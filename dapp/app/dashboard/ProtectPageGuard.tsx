'use client';
import { PageSpinner } from '@/components/utils';
import { useUser } from '@/hooks';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const ProtectPageGuard = ({ children }: Props) => {
  const { status } = useUser();
  const router = useRouter();
  console.log(router);

  // useEffect(() => {
  // }, [third])

  if (status === 'loading') {
    return <PageSpinner />;
  }

  if (status === 'unauthenticated') {
    // console.log(window);

    router?.push({
      pathname: '/login',
      query: { callback: router.route },
    });
    return <PageSpinner />;
  }

  return <>{children}</>;
};
