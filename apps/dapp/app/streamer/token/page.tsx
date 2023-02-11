'use client';

import { useUser } from '@/shared/User/hooks/useUser';
import { CreateUserToken } from '@/shared/UserToken/containers/CreateUserToken';
import { TokenPanel } from '@/shared/UserToken/containers/TokenPanel';

function Token() {
  const { user } = useUser();

  return (
    <section>
      {user?.userToken ? (
        <TokenPanel token={user?.userToken} />
      ) : (
        <CreateUserToken />
      )}
    </section>
  );
}

export default Token;
