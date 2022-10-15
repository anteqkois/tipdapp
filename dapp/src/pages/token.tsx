import { CreateUserToken } from '@/components/UserToken/CreateUserToken';
import { TokenPanel } from '@/components/UserToken/TokenPanel';
import { useUser } from '@/hooks';

const Token = () => {
  const {
    user: { address, token },
  } = useUser();
  // const [token, setToken] = useState<UserToken | null>(tokenfromSession);

  // useEffect(() => {
  //   tokenfromSession && setToken(tokenfromSession);
  //   // address &&
  //   //   (async () => {
  //   //     try {
  //   //       const { data } = await find({ userAddress: address });
  //   //       setToken(data.token);
  //   //     } catch (error) {
  //   //       console.log(error);
  //   //     }
  //   //   })();
  // }, [tokenfromSession]);

  return (
    <section>
      {token ? <TokenPanel token={token} /> : <CreateUserToken />}
    </section>
  );
};

Token.isProtected = true;

export default Token;
