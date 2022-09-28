import { CreateToken } from '@/components/UserToken/CreateToken';
import { TokenPanel } from '@/components/UserToken/TokenPanel';
import { Card } from '@/components/utils';

const Token = () => {
  const tokenData = false;

  return (
    <section>
      {tokenData ? <TokenPanel /> : <CreateToken />}
    </section>
  );
};

Token.isProtected = true;

export default Token;
