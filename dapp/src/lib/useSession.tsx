import {
  getCsrfToken,
  signIn,
  signOut,
  useSession as useNextAuthSession,
} from 'next-auth/react';
export { getCsrfToken, signIn, signOut };

export const useSession = () => {
  const { status, data } = useNextAuthSession();
  const refreshData = async () => {
    //In future
  };

  return { status, session: data, refreshData };
};
