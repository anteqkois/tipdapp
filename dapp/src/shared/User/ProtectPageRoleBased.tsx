'use client';
import { PageSpinner } from '@/shared/ui';
import { Role } from '@tipdapp/server';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { useUser } from './hooks/useUser';

type Props = {
  children: ReactNode;
  allowedRoles: Role[];
};

export const ProtectPageRoleBased = ({ children, allowedRoles }: Props) => {
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
