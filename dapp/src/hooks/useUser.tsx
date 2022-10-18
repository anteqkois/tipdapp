import { getTipsByUser } from '@/lib/redux/tipSlice.js';
import { signOut, useSession } from '@/lib/useSession';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { UserSession } from 'src/types/models';
import { useDisconnect } from 'wagmi';

const tempUser = {} as UserSession;

export const useUser = (): {
  login: () => void;
  logout: () => Promise<void>;
  user: UserSession;
} => {
  const { openConnectModal } = useConnectModal();
  const { disconnectAsync } = useDisconnect();
  const dispatch = useDispatch();
  const { session } = useSession();

  const user = useMemo<UserSession>((): UserSession => {
    return session?.user ? session.user : tempUser;
  }, [session]);

  //Dowload first tips page on login user
  useEffect(() => {
    if (user.address)
      // @ts-ignore
      dispatch(getTipsByUser({ userAddress: user.address, page: 1 }));
  }, [user.address, dispatch]);

  const login = () => {
    try {
      openConnectModal?.();
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async () => {
    await disconnectAsync();
    signOut({ callbackUrl: `${window.location.origin}/login` });
  };

  return { login, logout, user };
};

export default useUser;
