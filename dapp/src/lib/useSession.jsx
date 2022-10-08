import { getCsrfToken, signIn, signOut, useSession as useNextAuthSession } from 'next-auth/react';
export { getCsrfToken, signIn, signOut };

const initialUserData = {
  tipsCount: 0,
  tipsValue: '0',
  // allDonateWithdraw: '0',
  avatarPath: null,
  createdAt: null,
  email: null,
  firstName: null,
  lastName: null,
  urlPage: null,
  nick: null,
  nonce: null,
  tokenAddress: null,
  updateAt: null,
  address: '',
  widgetId: null,
};

export const useSession = () => {
  const { status, data } = useNextAuthSession();
  const refreshData = async () => {
    //In future
  };

  return { status, session: data ? data : initialUserData, refreshData };
};
