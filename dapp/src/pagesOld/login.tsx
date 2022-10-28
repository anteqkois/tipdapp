import PageLayout from '@/components/PageLayout';
import { CustomConnectButton } from '@/components/utils';
import { useUser } from '@/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Login = () => {
  const { login, logout, status } = useUser();
  const router = useRouter();

  // console.log(status);
  // console.log(router.query?.callback);
  // console.log(status === 'authenticated' && router.query?.callback);
  if (status === 'authenticated' && router.query?.callback)
    router.push({
      pathname: router.query.callback as string,
    });

  return (
    <>
      <CustomConnectButton />
      {/* <button onClick={login}>Login</button> */}
      <br />
      <button onClick={logout}>logout</button>
      <br />
      <Link href="/signup">signup</Link>
      <br />
    </>
  );
};

Login.getLayout = (page: JSX.Element) => <PageLayout>{page}</PageLayout>;

// const getServerSideProps = (ctx) => {
//   const { auth-token } = ctx.req.cookies;
//   if (auth-token)
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/dashboard',
//       },
//     };
// };

export default Login;
