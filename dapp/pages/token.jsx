import { CreateUserToken } from '@/components/UserToken/CreateUserToken';
import { TokenPanel } from '@/components/UserToken/TokenPanel';
import { Card } from '@/components/utils';

const Token = () => {
  const tokenData = false;

  return (
    <section>
      {tokenData ? <TokenPanel /> : <CreateUserToken />}
    </section>
  );
};

Token.isProtected = true;

export default Token;
