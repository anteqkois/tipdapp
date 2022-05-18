import React, { useState } from 'react';
import axios from 'axios';
// import useEthers from './useEthers';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useEthers } from '@usedapp/core';

const useUser = () => {
  // const [isConnected, setIsConnected] = useState(false);
  const { activateBrowserWallet, deactivate, active, account } = useEthers();
  // const { signer, activateBrowserWallet } = useEthers();
  const router = useRouter();

  const login = async () => {
    console.log(activateBrowserWallet());

    // try {
    //   if (!signer) {
    //     const { signer: newSigner } = await activateBrowserWallet();
    //     signer = newSigner;
    //   }

    //   const walletAddress = await signer.getAddress();

    //   const dataLogin = await axios('/api/auth/login', {
    //     method: 'POST',
    //     data: {
    //       walletAddress,
    //     },
    //   });
    //   const signature = await signer.signMessage(dataLogin.data.nonce);

    //   const dataAuth = await axios('/api/auth/authorization', {
    //     method: 'POST',
    //     data: {
    //       walletAddress,
    //       nonce: dataLogin.data.nonce,
    //       signature,
    //     },
    //   });
    //   dataAuth.status = 200 && toast.success('You are succesfully login');
    // } catch (error) {
    //   toast.error(error.response.data);
    // }
  };

  const logout = async () => {
    try {
      const dataLogout = await axios('/api/auth/logout');
      dataLogout.status = 200 && toast.success('You are succesfully logout');
      router.push('/login');
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const signIn = async ({ firstName, lastName, email, nick }) => {
    try {
      if (!signer) {
        const { signer: newSigner } = await activateBrowserWallet();
        signer = newSigner;
      }

      const walletAddress = await signer.getAddress();

      const dataSignIn = await axios('/api/auth/signin', {
        method: 'POST',
        data: {
          walletAddress,
          firstName,
          lastName,
          email,
          nick,
        },
      });

      const signature = await signer.signMessage(dataSignIn.data.nonce);

      const dataAuth = await axios('/api/auth/authorization', {
        method: 'POST',
        data: {
          walletAddress,
          nonce: dataSignIn.data.nonce,
          signature,
        },
      });
      dataAuth.status = 200 && toast.success('You are succesfully sign in');
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return { login, signIn, logout };
};

export default useUser;
