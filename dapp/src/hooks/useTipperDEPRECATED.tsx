// 'use client';
//@ts-nocheck
import { logoutUser, refreshToken, verifyMessageTipper } from '@/api/auth';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { SiweMessage } from 'siwe';
// import { TipperSession } from 'src/types/models';
import { AuthStatus } from '@/types';
import { useDisconnect } from 'wagmi';
import useLocalStorage from './useLocalStorage';

export const TipperContext = createContext<ReturnType>({} as ReturnType);

type TipperSession = any;

const tempTipper = {} as TipperSession;

type ReturnType = {
  login: () => void;
  logout: () => Promise<void>;
  verifyTipperMessage: (
    message: SiweMessage,
    signature: string
  ) => Promise<boolean>;
  tipper: TipperSession | null;
  setTipper: Dispatch<SetStateAction<TipperSession | null>>;
  status: AuthStatus;
  setStatus: Dispatch<SetStateAction<AuthStatus>>;
};

type Props = { children: ReactNode };

export const TipperProvider = ({ children }: Props) => {
  const [tipper, setTipper] = useLocalStorage<TipperSession>('tipper', null);
  // const [status, setStatus] = useCookie<AuthStatus>(
  //   'authStatus',
  //   'unauthenticated',
  //   { path: '/' }
  // );
  const [status, setStatus] = useState<AuthStatus>('authenticated');
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

  const verifyTipperMessage = async (
    message: SiweMessage,
    signature: string
  ): Promise<boolean> => {
    try {
      const data = await verifyMessageTipper({ message, signature });
      setTipper(data.tipper);
      setStatus('authenticated');
      router.push('/streamer/dashboard');
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
        setTipper(null);
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
    <TipperContext.Provider
      value={{
        login,
        logout,
        verifyTipperMessage,
        tipper: tipper,
        setUser: setTipper,
        status,
        setStatus,
      }}
    >
      {children}
    </TipperContext.Provider>
  );
};

const useUser = () => useContext<ReturnType>(TipperContext);

export { useUser };
