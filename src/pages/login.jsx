import PageLayout from '@/components/PageLayout';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useDisconnect } from 'wagmi';
// import { useEffect } from 'react';
// import { useDisconnect } from 'wagmi';

const Login = () => {
  // const { login, signIn, logout } = useUser();
  const { disconnectAsync, disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  // useEffect(() => {
  //   disconnect();
  //   // await disconnectAsync();
  // }, []);

  return (
    <>
      {/* <button onClick={connectWallet}>Connect wallet</button> */}
      {/* <ConnectButton /> */}
      <button onClick={openConnectModal}>Login</button>
      <br />
      {/* <button onClick={signIn}>signin</button> */}
      <br />
      {/* <button onClick={logout}>logout</button> */}
      <button onClick={disconnectAsync}>signOut</button>
      <br />
    </>
  );
};

Login.getLayout = (page) => <PageLayout className="">{page}</PageLayout>;

const getServerSideProps = (ctx) => {
  const { JWT } = ctx.req.cookies;
  if (JWT)
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard',
      },
    };
};

export default Login;
