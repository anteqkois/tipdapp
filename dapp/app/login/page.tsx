'use client';
import { CustomConnectButton } from '@/shared/ui';
import { useUser } from '@/shared/User/hooks/useUser';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login = () => {
  const { login, logout, status } = useUser();
  const router = useRouter();

  return (
    <>
      <CustomConnectButton />
      <br />
      <button onClick={logout}>logout</button>
      <br />
      <Link href="/signup">signup</Link>
      <br />
    </>
  );
};

export default Login;
