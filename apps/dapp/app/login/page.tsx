'use client';

import { CustomConnectButton } from '@/shared/ui';
import { useUser } from '@/shared/User/hooks/useUser';
import Link from 'next/link';

function Login() {
  const { logout } = useUser();

  return (
    <>
      <CustomConnectButton />
      <br />
      <button
        type="button"
        onClick={logout}
      >
        logout
      </button>
      <br />
      <Link href="/signup">signup</Link>
      <br />
    </>
  );
}

export default Login;
