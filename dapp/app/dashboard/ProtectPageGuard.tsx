'use client';
import { PageSpinner } from '@/components/utils';
import { useUser } from '@/hooks';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const ProtectPageGuard = ({ children }: Props) => {
  const { status } = useUser();
  const router = useRouter();

  if (status === 'loading') {
    return <PageSpinner />;
  }

  //TODO add callback feature
  if (status === 'unauthenticated') {
    router?.push('/login');
    return <PageSpinner />;
  }

  return <>{children}</>;
};
