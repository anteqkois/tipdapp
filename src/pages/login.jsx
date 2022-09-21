import PageLayout from '@/components/PageLayout';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useDisconnect } from 'wagmi';
import {useUser} from '@/hooks';

const Login = () => {
  const { login, logout } = useUser();

  return (
    <>
      <button onClick={login}>Login</button>
      <br />
      <button onClick={logout}>logout</button>
      <br />
      <Link href="/signup">signup</Link>
      <br />
    </>
  );
};

Login.getLayout = (page) => <PageLayout className="">{page}</PageLayout>;

// const getServerSideProps = (ctx) => {
//   const { JWT } = ctx.req.cookies;
//   if (JWT)
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/dashboard',
//       },
//     };
// };

export default Login;
