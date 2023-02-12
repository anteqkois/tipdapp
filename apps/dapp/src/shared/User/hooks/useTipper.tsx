'use client';

import { verifyMessage } from '@/api/auth';
import { useLocalStorage } from '@/shared/hooks';
import { AuthStatus } from '@/types/index';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Tipper } from '@tipdapp/database';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import toast from 'react-hot-toast';
import { SiweMessage } from 'siwe';
import { useDisconnect } from 'wagmi';

const TipperContext = createContext<ReturnType>({} as ReturnType);

type ReturnType = {
  login: () => void;
  logout: () => Promise<void>;
  verifyTipperMessage: (
    message: SiweMessage,
    signature: string
  ) => Promise<boolean>;
  status: AuthStatus;
  tipper: Tipper | undefined;
};

type Props = { children: ReactNode };

const TipperProvider = ({ children }: Props) => {
  const [tipper, setTipper] = useLocalStorage<Tipper>('tipper');
  const [status, setStatus] = useLocalStorage<AuthStatus>(
    'authStatus',
    'unauthenticated'
    // { path: '/' }
  );
  const { openConnectModal } = useConnectModal();
  const { disconnectAsync } = useDisconnect();
  const login = useCallback(() => {
    tipper
      ? (() => {
          openConnectModal?.();
          setStatus('loading');
        })()
      : toast.error('You are already login.');
  }, [openConnectModal, setStatus, tipper]);

  const verifyTipperMessage = useCallback(
    async (message: SiweMessage, signature: string) => {
      try {
        const data = await verifyMessage<'tipper'>({
          message,
          signature,
          type: 'tipper',
        });
        setTipper(data.tipper);
        setStatus('authenticated');
        return true;
      } catch (err: any) {
        toast.error(
          err[0].message ?? 'Something went wrong ! You can not login now.'
        );
        setStatus('unauthenticated');
        return false;
      }
    },
    [setStatus, setTipper]
  );

  const logout = useCallback(async () => {
    try {
      await disconnectAsync();
      setTipper(undefined);
      setStatus('unauthenticated');
    } catch (error: any) {
      console.log(error);
      toast.error(
        error[0].message ?? 'Something went wrong ! You can not logout.'
      );
    }
  }, [disconnectAsync, setStatus, setTipper]);

  const value = useMemo(
    () => ({
      login,
      logout,
      verifyTipperMessage,
      status,
      tipper,
    }),
    [login, logout, status, tipper, verifyTipperMessage]
  );

  return (
    <TipperContext.Provider value={value}>{children}</TipperContext.Provider>
  );
};

const useTipper = () => useContext<ReturnType>(TipperContext);

export { TipperProvider, useTipper };
