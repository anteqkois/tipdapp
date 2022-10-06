import { CreateUserToken } from '@/components/UserToken/CreateUserToken';
import { TokenPanel } from '@/components/UserToken/TokenPanel';
import { useUser } from '@/hooks';
import { find } from 'api/userToken';
import { useEffect, useState } from 'react';

const Token = () => {
  const { user } = useUser();
  const [token, setToken] = useState(null);

  useEffect(() => {
    user?.address &&
      (async () => {
        try {
          const tokenData = await find({userAddress: user.address});
          setToken(tokenData.data.token);
        } catch (error) {
          console.log(error);
        }
      })();
  }, [token?.created]);

  return <section>{token?.address ? <TokenPanel token={token} /> : <CreateUserToken setToken={setToken} />}</section>;
};

Token.isProtected = true;

export default Token;
