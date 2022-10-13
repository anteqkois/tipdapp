import { find } from '@/api/userToken';
import { CreateUserToken } from '@/components/UserToken/CreateUserToken';
import { TokenPanel } from '@/components/UserToken/TokenPanel';
import { useUser } from '@/hooks';
import { UserToken } from '@prisma/client';
import { useEffect, useState } from 'react';

const Token = () => {
  const {
    user: { address, token: tokenfromSession },
  } = useUser();
  const [token, setToken] = useState<
    UserToken | Pick<UserToken, 'address'> | null
  >(tokenfromSession);

  useEffect(() => {
    address &&
      (async () => {
        try {
          const { data } = await find({ userAddress: address });
          setToken(data.token);
        } catch (error) {
          console.log(error);
        }
      })();
  }, [token?.address, address]);

  return (
    <section>
      {token?.address ? (
        <TokenPanel token={token} />
      ) : (
        <CreateUserToken />
      )}
    </section>
  );
};

Token.isProtected = true;

export default Token;
