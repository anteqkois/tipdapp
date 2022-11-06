// 'use client';
import { logoutUser, verifyMessage } from '@/api/auth';
import { getTipsByUser } from '@/lib/redux/tipSlice.js';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import axios from 'axios';
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
import { useDispatch } from 'react-redux';
import { SiweMessage } from 'siwe';
import { UserSession } from 'src/types/models';
import { useDisconnect } from 'wagmi';
import useLocalStorage from './useLocalStorage';

// export const useUser = (): ReturnType => {
// const [user, setUser] = useState<UserSession>(tempUser);
// const [status, setStatus] = useState<AuthStatus>('unauthenticated');
// const { openConnectModal } = useConnectModal();
// const { disconnectAsync } = useDisconnect();
// const dispatch = useDispatch();

// // const user = useMemo<UserSession>((): UserSession => {
// //   return session?.user ? session.user : tempUser;
// // }, [session]);

// //Dowload first tips page on login user
// useEffect(() => {
//   if (user.address)
//     // @ts-ignore
//     dispatch(getTipsByUser({ userAddress: user.address, page: 1 }));
// }, [user.address, dispatch]);

// const login = () => {
//   status === 'unauthenticated'
//     ? openConnectModal?.()
//     : toast.error('You are already login.');
//   // try {
//   //   openConnectModal?.();
//   // } catch (error) {
//   //   toast.error('You are already login.');
//   //   // console.log(error);
//   // }
// };

// const logout = async () => {
//   await disconnectAsync();
//   setStatus('unauthenticated');
//   // signOut({ callbackUrl: `${window.location.origin}/login` });
// };

//   return { login, logout, user, setUser, status, setStatus };
// };

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
  // const [user, setUser] = useLocalStorage<UserSession>('user', tempUser);
  const [user, setUser] = useLocalStorage<UserSession>('user', null);
  // const [user, setUser] = useState<UserSession>(tempUser);
  const [status, setStatus] = useLocalStorage<AuthStatus>(
    'authStatus',
    'unauthenticated'
  );
  // const [status, setStatus] = useState<AuthStatus>('unauthenticated');
  const { openConnectModal } = useConnectModal();
  const { disconnectAsync } = useDisconnect();
  // const dispatch = useDispatch();
  const router = useRouter();

  // console.log(status);

  // const [user, setUser] = useState<UserSession>(tempUser);

  // console.log(openConnectModal);
  // console.log(openConnectModal);

  // const user = useMemo<UserSession>((): UserSession => {
  //   return session?.user ? session.user : tempUser;
  // }, [session]);

  //Dowload first tips page on login user
  // useEffect(() => {
  //   if (user?.address)
  //     // @ts-ignore
  //     dispatch(getTipsByUser({ page: 1 }));
  // }, [user?.address, dispatch]);

  const login = () => {
    status === 'unauthenticated'
      ? openConnectModal?.()
      : toast.error('You are already login.');
    // try {
    //   openConnectModal?.();
    // } catch (error) {
    //   toast.error('You are already login.');
    //   // console.log(error);
    // }
  };

  const verify = async (
    message: SiweMessage,
    signature: string
  ): Promise<boolean> => {
    try {
      const { data } = await verifyMessage({ message, signature });
      setUser(data.user);
      setStatus('authenticated');
      router.push('/user/dashboard');
      return true;
    } catch (err: unknown) {
      console.log(err)
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.error[0].message);
      }
      toast.error('Something went wrong ! You can not login now.');
      return false;
    }
  };

  const logout = async () => {
    try {
      if(status === 'authenticated'){
        await disconnectAsync();
        const { data } = await logoutUser();
        toast.success(data.message);
        setStatus('unauthenticated');
        setUser(null);
      }else{
        toast.error('You are not conneted.');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.error[0].message);
      } else {
        toast.error('Something went wrong ! You can not logout.');
      }
    }
    // signOut({ callbackUrl: `${window.location.origin}/login` });
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
