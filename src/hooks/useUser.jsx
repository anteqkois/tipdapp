import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signOut, useUserSession } from 'src/lib/UserSessionProvider';
import { getTipsByUser } from 'src/lib/redux/tipSlice';
import { useDisconnect } from 'wagmi';

export const useUser = () => {
  const { openConnectModal } = useConnectModal();
  const { disconnectAsync } = useDisconnect();
  const dispatch = useDispatch();
  const { session, status } = useUserSession();

  //Dowload first tips page on login user
  useEffect(() => {
    if (session?.user) dispatch(getTipsByUser({ userWalletAddress: session.user.walletAddress, page: 1 }));
    console.log('fetch fist page');
  }, [session]);

  const login = () => {
    status === 'unauthenticated' && openConnectModal();
  };
  const logout = async () => {
    await disconnectAsync();
    signOut({ callbackUrl: `${window.location.origin}/login'}` });
  };

  return { login, logout, user: session.user };
};

export default useUser;
