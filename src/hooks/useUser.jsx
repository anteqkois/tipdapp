import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
// import { useEthers } from '@usedapp/core';

const useUser = () => {
  // const { activateBrowserWallet, deactivate, account, library } = useEthers();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const { address, isConnecting, isDisconnected } = useAccount();
   const { data, isError, isLoading, isSuccess, signMessageAsync } = useSignMessage();
  // const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const router = useRouter();

  useEffect(() => {
    console.log(address);
    // console.log(isConnecting);
    console.log(isDisconnected);
    console.log(connect);
    console.log(connectors);
    console.log(error);
    // console.log(pendingConnector);
  }, [address]);

  const fetchNonceAndSign = async () => {
    try {
      // if (!account) await activateBrowserWallet();

      const dataLogin = await axios('/api/auth/login', {
        method: 'POST',
        data: {
          walletAddress: address,
        },
      });

      // const signer = library.getSigner();
      // const signature = await signMessageAsync(dataLogin.data.nonce);
      const signature = await signMessageAsync(dataLogin.data.nonce);
      console.log(signature);

      const dataAuth = await axios('/api/auth/authorization', {
        method: 'POST',
        data: {
          walletAddress: address,
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
    if (isDisconnected) await openConnectModal();
  };

  const logout = async () => {
    try {
      const dataLogout = await axios('/api/auth/logout');
      dataLogout.status = 200 && toast.success('You are succesfully logout');
      await disconnect();
      router.push('/login');
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const signIn = async ({ firstName, lastName, email, nick }) => {
    try {
      if (isDisconnected) await openConnectModal();

      const dataSignIn = await axios('/api/auth/signin', {
        method: 'POST',
        data: {
          walletAddress: address,
          firstName,
          lastName,
          email,
          nick,
        },
      });

      // const signer = library.getSigner();
      const signature = await signMessageAsync(dataSignIn.data.nonce);

      const dataAuth = await axios('/api/auth/authorization', {
        method: 'POST',
        data: {
          walletAddress: address,
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
