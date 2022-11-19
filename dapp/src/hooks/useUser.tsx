// 'use client';
import { logoutUser, refreshToken, verifyMessage } from '@/api/auth';
import { useConnectModal } from '@rainbow-me/rainbowkit';
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
import { UserSession } from 'src/types/models';
import { useDisconnect } from 'wagmi';
import useCookie from './useCookie';
import useLocalStorage from './useLocalStorage';

export const UserContext = createContext<ReturnType>({} as ReturnType);

const tempUser = {} as UserSession;
type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

type ReturnType = {
  login: () => void;
  logout: () => Promise<void>;
  verify: (message: SiweMessage, signature: string) => Promise<boolean>;
  user: UserSession | null;
  setUser: Dispatch<SetStateAction<UserSession | null>>;
  status: AuthStatus;
  setStatus: Dispatch<SetStateAction<AuthStatus>>;
};

type Props = { children: ReactNode };

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useLocalStorage<UserSession>('user', null);
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
      setStatus('authenticated');
      router.push('/user/dashboard');
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
        setUser(null);
      } else {
        toast.error('You are not conneted.');
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
      value={{ login, logout, verify, user, setUser, status, setStatus }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext<ReturnType>(UserContext);

export { useUser };
