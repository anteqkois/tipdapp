import Spinner from '@/components/utils/Spinner';
import { useUserSession } from '@/lib';
import { useRouter } from 'next/router';

export const ProtectPageGuard = ({ children, protect }) => {
  const { status } = useUserSession();
  const router = useRouter();

  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === 'unauthenticated' && protect) {
    router.push({
      pathname: '/login',
      query: { callback: router.route },
    });
    return <Spinner />;
  }

  return <>{children}</>;
};
export default ProtectPageGuard;
