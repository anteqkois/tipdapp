import api from '@/api/apiConfig';
import {
  getCsrfToken,
  signIn,
  signOut,
  useSession as useNextAuthSession,
} from 'next-auth/react';
export { getCsrfToken, signIn, signOut };

export const useSession = () => {
  const { status, data } = useNextAuthSession();

  const refreshSessionData = async () => {
    await api.get('auth/session?update=true');

    const event = new Event('visibilitychange');
    document.dispatchEvent(event);
  };

  return { status, session: data, refreshSessionData };
};
