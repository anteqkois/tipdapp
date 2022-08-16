import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import useLocalStorage from './useLocalStorage';

const ACTION = {
  LOGIN: 'LOGIN',
  SIGNIN: 'SIGNIN',
  IDLE: 'IDLE',
};

// const initialUserData = {
//   firstName: '',
//   lastName: '',
//   email: '',
//   nick: '',
// };

const useUser = () => {
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount({
    onConnect() {},
    onDisconnect() {
      // message ? redirect to root path ?
    },
  });
  const { data, isSuccess, signMessageAsync } = useSignMessage();

  const [action, setAction] = useState('');
  const [error, setError] = useState();
  const [userData, setUserData] = useLocalStorage('userData', null);
  const router = useRouter();

  useEffect(() => {
    //TODO! load data from localstorage
  }, []);

  useEffect(() => {
    if (isConnected) {
      if (action === ACTION.LOGIN) handleLogin();
      if (action === ACTION.SIGNIN) handleSignIn();
    }
  }, [isConnected, userData]);

  const login = async () => {
    if (isConnected) {
      toast.success('You are already logged in');
    } else {
      await openConnectModal();
      setAction(ACTION.LOGIN);
    }
  };

  const signIn = async ({ firstName, lastName, email, nick }) => {
    if (isConnected && !error) {
      toast.success('You are already logged in');
    } else if (isConnected) {
      setUserData({ firstName, lastName, email, nick });
      setAction(ACTION.SIGNIN);
    } else {
      await openConnectModal();
      setUserData({ firstName, lastName, email, nick });
      setAction(ACTION.SIGNIN);
    }
  };

  const logout = async () => {
    try {
      const dataLogout = await axios('/api/auth/logout');
      await disconnect();
      setUserData(null);
      dataLogout.status = 200 && toast.success('You are succesfully logout');
      router.push('/login');
    } catch (error) {
      toast.error(error.response.data.userMessage);
    }
  };

  const handleLogin = async () => {
    try {
      const dataLogin = await axios('/api/auth/login', {
        method: 'POST',
        data: {
          walletAddress: address,
        },
      });

      const signature = await signMessageAsync({ message: dataLogin.data.nonce });

      const dataAuth = await axios('/api/auth/authorization', {
        method: 'POST',
        data: {
          walletAddress: address,
          nonce: dataLogin.data.nonce,
          signature,
        },
      });

      setUserData(dataLogin.data.user);

      if (window.history.length > 1 && document.referrer.indexOf(window.location.host) !== -1) {
        router.back();
      } else {
        router.push('/dashboard');
      }
      dataAuth.status = 200 && toast.success('You are succesfully login');
    } catch (error) {
      // console.log(error);
      toast.error(error.response?.data?.userMessage);
    }
    setAction(ACTION.IDLE);
  };

  const handleSignIn = async () => {
    try {
      const dataSignIn = await axios('/api/auth/signin', {
        method: 'POST',
        data: {
          walletAddress: address,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          nick: userData.nick,
        },
      });

      const signature = await signMessageAsync({ message: dataSignIn.data.nonce });

      const dataAuth = await axios('/api/auth/authorization', {
        method: 'POST',
        data: {
          walletAddress: address,
          nonce: dataSignIn.data.nonce,
          signature,
        },
      });
      dataAuth.status = 200 && toast.success('You are succesfully sign in');
      router.push('/dashboard');
    } catch (error) {
      error.response.data.errors ? setError(error.response.data.errors) : toast.error(error.response.data.userMessage);
    }
    setAction(ACTION.IDLE);
  };

  return { login, signIn, logout, user: { ...userData, address }, error };
};

export default useUser;
