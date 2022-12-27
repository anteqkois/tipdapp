// 'use client';
import { logoutUser, refreshToken, verifyMessage } from '@/api/auth';
import { AuthStatus } from '@/types';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { UserSession } from '@tipdapp/server';
import { useRouter } from 'next/navigation';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
} from 'react';
import toast from 'react-hot-toast';
import { SiweMessage } from 'siwe';
import { useDisconnect } from 'wagmi';
import useCookie from './useCookie';
import useLocalStorage from './useLocalStorage';

export const UserContext = createContext<ReturnType>({} as ReturnType);

const tempUser = {} as UserSession;

type ReturnType = {
  login: () => void;
  logout: () => Promise<void>;
  verify: (message: SiweMessage, signature: string) => Promise<boolean>;
  user?: UserSession;
  setUser: Dispatch<SetStateAction<UserSession | undefined>>;
  status: AuthStatus;
  setStatus: Dispatch<SetStateAction<AuthStatus>>;
};

type Props = { children: ReactNode };

export const UserProvider = ({ children }: Props) => {
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
      refreshToken();
      //Refresh in 30s interval
      interval = setInterval(() => {
        refreshToken();
      }, 30000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [status]);

  const login = () => {
    status === 'unauthenticated'
      ? openConnectModal?.()
      : toast.error('You are already login.');
  };

  const verify = async (
    message: SiweMessage,
    signature: string
  ): Promise<boolean> => {
    try {
      const data = await verifyMessage({ message, signature });
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
      return false;
    }
  };

  const logout = async () => {
    try {
      if (status === 'authenticated') {
        await disconnectAsync();
        const data = await logoutUser();
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
  };

  return (
    <UserContext.Provider
      value={{
        login,
        logout,
        verify,
        user,
        setUser,
        status,
        setStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext<ReturnType>(UserContext);

export { useUser };
