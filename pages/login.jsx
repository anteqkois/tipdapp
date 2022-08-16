import axios from 'axios';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useUser from '@/hooks/useUser';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const login = () => {
  const { login, signIn, logout } = useUser();
  // const getUserdata = async () => {
  //   const data = await axios('/api/user');
  //   console.log(data);
  // };

  // const auth = async () => {
  //   try {
  //     if (!signer) {
  //       const { signer: newSigner } = await connectWallet();
  //       signer = newSigner;
  //     }
  //     const walletAddress = await signer.getAddress();

  //     const nonce = '221dc55f-d6d7-470c-9849-db4e81fff8e8';
  //     const signature =
  //       '0xd1358a18bf7fcfd8823529c379ee3b47669bb440fdb54a32ba6e66e64d75dd203ade9edc8c9a168738bde1eaa561e87f76d7c6b5cfd90979181e66c628d56cb51c';
  //     const dataAuth = await axios('/api/auth/authorization', {
  //       method: 'POST',
  //       data: {
  //         walletAddress,
  //         nonce,
  //         signature,
  //       },
  //     });
  //     console.log(dataAuth);
  //     dataAuth.status = 200 && toast.success('You are succesfully sign in');
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.response.data);
  //   }
  // };

  return (
    <>
      {/* <button onClick={connectWallet}>Connect wallet</button> */}
      {/* <ConnectButton /> */}
      <button onClick={login}>Login</button>
      <br />
      <button onClick={signIn}>signin</button>
      <br />
      <button onClick={logout}>logout</button>
      <br />
      {/* <button onClick={getUserdata}>getUserdata</button> */}
      {/* <br /> */}
      {/* <button onClick={auth}>auth</button> */}
      {/* <button onClick={handlePostRequest}>handlePostRequest</button> */}
    </>
  );
};

export default login;

login.getLayout = (page) => <>{page}</>;
