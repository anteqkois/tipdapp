'use client';

import { CreateUserToken } from '@/components/UserToken/CreateUserToken';
import { TokenPanel } from '@/components/UserToken/TokenPanel';
import { useUser } from '@/hooks';

const Token = () => {
  const {
    user
  } = useUser();

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
