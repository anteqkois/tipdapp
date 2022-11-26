'use client';
import { PageSpinner } from '@/components/utils';
import { useUser } from '@/hooks';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

type Roles = 'tipper' | 'streamer';

type Props = {
  children: ReactNode;
  allowedRoles: Roles[];
};

export const ProtectPageGuard = ({ children, allowedRoles }: Props) => {
  const {
    status,
    user: { roles },
  } = useUser();
  const router = useRouter();

  if (status === 'loading') {
    return <PageSpinner />;
  }
  //TODO add callback feature
  if (
    status === 'unauthenticated' ||
    !roles
      .map((role: Roles) => allowedRoles.includes(role))
      .find((val: boolean) => val === true)
  ) {
    router?.push('/login');
    return <PageSpinner />;
  }

  return <>{children}</>;
};
