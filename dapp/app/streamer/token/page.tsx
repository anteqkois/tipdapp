'use client';

import { CreateUserToken } from '@/components/UserToken/CreateUserToken';
import { TokenPanel } from '@/components/UserToken/TokenPanel';
import { useUser } from '@/hooks';

const Token = () => {
  const {
    user: { token },
  } = useUser();

  return (
    <section>
      {token ? <TokenPanel token={token} /> : <CreateUserToken />}
    </section>
  );
};

export default Token;
