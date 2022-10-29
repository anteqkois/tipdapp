import { useUser } from '@/hooks';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  // protect: boolean;
};

export const ProtectPageGuard = ({ children }: Props) => {
  const { status } = useUser();
  // const router = useRouter();

  // if (status === 'loading') {
  //   return <PageSpinner />;
  // }

  // if (status === 'unauthenticated' && protect) {
  //   console.log(window);
  //   router.push({
  //     pathname: '/login',
  //     query: { callback: router.route },
  //   });
  //   return <PageSpinner />;
  // }

  return <>{children}</>;
};
