import Spinner from '@/components/utils/Spinner';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const ProtectPageGuard = ({ children, protect }) => {
  const { status } = useSession();
  const router = useRouter();

  // console.log(status);
  // console.log(protect);

  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === 'unauthenticated' && protect) {
    router.push('/login');
    return <Spinner />;
  }

  return <>{children}</>;
};
export default ProtectPageGuard;
