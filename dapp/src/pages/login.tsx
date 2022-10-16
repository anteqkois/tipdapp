import PageLayout from '@/components/PageLayout';
import { useUser } from '@/hooks';
import { useSession } from '@/lib/useSession';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Login = () => {
  const { login, logout } = useUser();
  const { status } = useSession();
  const router = useRouter();

  console.log(status);
  console.log(router.query?.callback);
  console.log(status === 'authenticated' && router.query?.callback);
  if (status === 'authenticated' && router.query?.callback)
    router.push({
      pathname: router.query.callback as string,
    });

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

Login.getLayout = (page: JSX.Element) => <PageLayout>{page}</PageLayout>;

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
