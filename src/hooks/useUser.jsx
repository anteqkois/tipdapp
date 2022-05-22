import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useEthers } from '@usedapp/core';

const useUser = () => {
  const { activateBrowserWallet, deactivate, account, library } = useEthers();
  const router = useRouter();

  const fetchNonceAndSign = async () => {
    try {
      console.log(account);

      // if (!account) await activateBrowserWallet();

      const dataLogin = await axios('/api/auth/login', {
        method: 'POST',
        data: {
          walletAddress: account,
        },
      });

      const signer = library.getSigner();
      const signature = await signer.signMessage(dataLogin.data.nonce);

      const dataAuth = await axios('/api/auth/authorization', {
        method: 'POST',
        data: {
          walletAddress: account,
          nonce: dataLogin.data.nonce,
          signature,
        },
      });
      dataAuth.status = 200 && toast.success('You are succesfully login');
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const login = async () => {
    if (!account) await activateBrowserWallet();
  };

  const logout = async () => {
    try {
      const dataLogout = await axios('/api/auth/logout');
      dataLogout.status = 200 && toast.success('You are succesfully logout');
      await deactivate();
      router.push('/login');
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const signIn = async ({ firstName, lastName, email, nick }) => {
    try {
      if (!account) await activateBrowserWallet();

      const dataSignIn = await axios('/api/auth/signin', {
        method: 'POST',
        data: {
          walletAddress: account,
          firstName,
          lastName,
          email,
          nick,
        },
      });

      const signer = library.getSigner();
      const signature = await signer.signMessage(dataSignIn.data.nonce);

      const dataAuth = await axios('/api/auth/authorization', {
        method: 'POST',
        data: {
          walletAddress: account,
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
