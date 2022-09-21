import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react';
export { getCsrfToken, signIn, signOut };

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

export const useUserSession = () => {
  const { status, data } = useSession();

  return { status, session: data ? data : initialUserData };
};
