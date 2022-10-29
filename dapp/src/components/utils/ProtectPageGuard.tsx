import { useSession } from '@/lib/useSession';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { PageSpinner } from './PageSpinner';

type Props = {
  children: ReactNode;
  protect: boolean;
};

export const ProtectPageGuard = ({ children, protect }: Props) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <PageSpinner />;
  }

  if (status === 'unauthenticated' && protect) {
    router.push({
      pathname: '/login',
      query: { callback: router.route },
    });
    return <PageSpinner />;
  }

  return <>{children}</>;
};
