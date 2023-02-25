'use client';

import { useCookie, useLocalStorage } from '@/shared/hooks';
import { AuthStatus } from '@/types';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { apiClient } from '@tipdapp/api';
import { UserSession } from '@tipdapp/types';
import { useRouter } from 'next/navigation';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import toast from 'react-hot-toast';
import { SiweMessage } from 'siwe';
import { useDisconnect } from 'wagmi';

const UserContext = createContext<ReturnType>({} as ReturnType);

type ReturnType = {
  login: () => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  verifyUserMessage: (
    message: SiweMessage,
    signature: string
  ) => Promise<boolean>;
  user?: UserSession;
  setUser: Dispatch<SetStateAction<UserSession | undefined>>;
  status: AuthStatus;
  setStatus: Dispatch<SetStateAction<AuthStatus>>;
};

type Props = { children: ReactNode };

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useLocalStorage<UserSession>('user');
  const [status, setStatus] = useCookie<AuthStatus>(
    'authStatus',
    'unauthenticated',
    { path: '/' }
  );
  const { openConnectModal } = useConnectModal();
  const { disconnectAsync } = useDisconnect();
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (status === 'authenticated') {
      // refreshToken();
      // Refresh in 30s interval
      interval = setInterval(() => {
        apiClient.auth.refreshToken();
      }, 30 * 60 * 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [status]);

  const login = useCallback(() => {
    status === 'unauthenticated'
      ? (() => {
          openConnectModal?.();
          setStatus('loading');
        })()
      : toast.error('You are already login.');
  }, [openConnectModal, setStatus, status]);

  const verifyUserMessage = useCallback(
    async (message: SiweMessage, signature: string) => {
      try {
        const data = await apiClient.auth.verifyMessage<'user'>({
          message,
          signature,
          type: 'user',
        });
        setUser(data.user);
        //! Get from use default role type and redirect there
        //! if use is at page to make a tip, no redirect
        setStatus('authenticated');

        router.push(`/${data.user.activeRole}/dashboard`);
        // if (data.user.roles.includes('streamer'))
        //   router.push('/streamer/dashboard');
        // else router.push('/tipper/dashboard');
        return true;
      } catch (err: any) {
        toast.error(
          err[0].message ?? 'Something went wrong ! You can not login now.'
        );
        setStatus('unauthenticated');
        return false;
      }
    },
    [router, setStatus, setUser]
  );

  const logout = useCallback(async () => {
    try {
      if (status === 'authenticated') {
        await disconnectAsync();
        const data = await apiClient.auth.logoutUser();
        toast.success(data.message);
        setStatus('unauthenticated');
        setUser(undefined);
      } else {
        // toast.error('You are not conneted.');
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error[0].message ?? 'Something went wrong ! You can not logout.'
      );
    }
  }, [disconnectAsync, setStatus, setUser, status]);

  const refreshUser = useCallback(async () => {
    try {
      const data = await apiClient.auth.refreshUserSession();
      setUser(data.user);
    } catch (error: any) {
      console.log(error);
      toast.error(
        error[0].message ?? 'Something went wrong ! You can not logout.'
      );
    }
  }, [setUser]);

  const value = useMemo(
    () => ({
      login,
      logout,
      verifyUserMessage,
      refreshUser,
      user,
      setUser,
      status,
      setStatus,
    }),
    [
      login,
      logout,
      refreshUser,
      setStatus,
      setUser,
      status,
      user,
      verifyUserMessage,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => useContext<ReturnType>(UserContext);

export { UserProvider, useUser };
