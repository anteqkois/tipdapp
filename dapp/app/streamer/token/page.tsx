'use client';

import { CreateUserToken } from '@/modules/UserToken/containers/CreateUserToken';
import { TokenPanel } from '@/modules/UserToken/containers/TokenPanel';
import { useUser } from '@/shared/User/hooks/useUser';

const Token = () => {
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
};

export default Token;
