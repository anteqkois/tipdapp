'use client';
import { PageSpinner } from '@/components/utils';
import { useUser } from '@/hooks';
import { Role } from '@tipdapp/server';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  allowedRoles: Role[];
};

export const ProtectPageGuard = ({ children, allowedRoles }: Props) => {
  const { status, user } = useUser();
  const router = useRouter();

  if (status === 'loading') {
    return <PageSpinner />;
  }
  //TODO add callback feature
  if (
    status === 'unauthenticated' ||
    !user?.roles
      .map((role: Role) => allowedRoles.includes(role))
      .some((val: boolean) => val === true)
  ) {
    router?.push('/login');
    return <PageSpinner />;
  }

  return <>{children}</>;
};
