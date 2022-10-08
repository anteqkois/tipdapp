import { getTipsByUser } from '@/lib/redux/tipSlice.js';
import { signOut, useSession } from '@/lib/useSession';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDisconnect } from 'wagmi';

export const useUser = () => {
  const { openConnectModal } = useConnectModal();
  const { disconnectAsync } = useDisconnect();
  const dispatch = useDispatch();
  const { session, status } = useSession();

  //Dowload first tips page on login user
  useEffect(() => {
    if (session?.user) dispatch(getTipsByUser({ userAddress: session.user.address, page: 1 }));
  }, [session]);

  const login = () => {
    status === 'unauthenticated' && openConnectModal();
  };
  const logout = async () => {
    await disconnectAsync();
    signOut({ callbackUrl: `${window.location.origin}/login` });
  };

  return { login, logout, user: session.user };
};

export default useUser;
