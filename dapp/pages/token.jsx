import { CreateUserToken } from '@/components/UserToken/CreateUserToken';
import { TokenPanel } from '@/components/UserToken/TokenPanel';
import { useUser } from '@/hooks';

const Token = () => {
  const tokenData = false;
  const { user } = useUser();
  // const { refreshData } = useUserSession();
  // // refreshData();

  return <section>{user.token ? <TokenPanel token={user.token} /> : <CreateUserToken />}</section>;
};

Token.isProtected = true;

export default Token;
