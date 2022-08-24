import { useConnectModal } from '@rainbow-me/rainbowkit';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import useLocalStorage from './useLocalStorage';

const ACTION = {
  LOGIN: 'LOGIN',
  SIGNIN: 'SIGNIN',
  IDLE: 'IDLE',
};

const initialUserData = {
  allDonateCount: 0,
  allDonateValue: '0',
  allDonateWithdraw: '0',
  avatarPath: null,
  createdAt: null,
  email: null,
  firstName: null,
  lastName: null,
  linkToDonate: null,
  nick: null,
  nonce: null,
  tokenAddress: null,
  updateAt: null,
  walletAddress: '',
  widgetId: null,
};

const useUser = () => {
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount({
    onConnect() {},
    onDisconnect() {
      // logout();
      // message ? redirect to root path ?
    },
  });
  const { data, isSuccess, signMessageAsync } = useSignMessage();

  const [action, setAction] = useState('');
  const [error, setError] = useState();
  const [user, setUser] = useLocalStorage('user', initialUserData);
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      if (action === ACTION.LOGIN) handleLogin();
      if (action === ACTION.SIGNIN) handleSignIn();
    }
  }, [isConnected, user]);

  const login = async () => {
    //   if (isConnected && user.walletAddress) {
    //     toast.success('You are already logged in');
    //   } else {
    disconnect();
    await openConnectModal();
    setAction(ACTION.LOGIN);
    // }
  };

  const signIn = async ({ firstName, lastName, email, nick }) => {
    if (isConnected && !error) {
      toast.success('You are already logged in');
    } else if (isConnected) {
      setUser({ firstName, lastName, email, nick });
      setAction(ACTION.SIGNIN);
    } else {
      await openConnectModal();
      setUser({ firstName, lastName, email, nick });
      setAction(ACTION.SIGNIN);
    }
  };

  const logout = async () => {
    try {
      const dataLogout = await axios('/api/auth/logout');
      await disconnect();
      dataLogout.status = 200 && toast.success('You are succesfully logout');
      setUser(initialUserData);
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

      // console.log(dataLogin.data.user);
      setUser(dataLogin.data.user);

      // if (window.history.length > 1 && document.referrer.indexOf(window.location.host) !== -1) {
      //   router.back();
      // } else {
      router.push('/dashboard');
      // }
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
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          nick: user.nick,
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
      setUser(dataAuth.data.user);
      router.push('/dashboard');
    } catch (error) {
      error.response.data.errors ? setError(error.response.data.errors) : toast.error(error.response.data.userMessage);
    }
    setAction(ACTION.IDLE);
  };

  return { login, signIn, logout, user, error };
};

export default useUser;
