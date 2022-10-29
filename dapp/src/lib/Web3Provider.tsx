'use client';
import { getNonce } from '@/api/auth';
import { useUser, useMediaQuery } from '@/hooks';
import { selectFormData } from '@/lib/redux/signUpFormSlice';
import {
  createAuthenticationAdapter,
  getDefaultWallets,
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SiweMessage } from 'siwe';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.hardhat, chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: () => ({
        http: `http://127.0.0.1:8545/`,
        webSocket: `wss://127.0.0.1:8545/`,
      }),
    }),
    // alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const RainbowKitProviders = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const { setUser, setStatus, status, logout, verify } = useUser();
  const formData = useSelector(selectFormData);
  const isMobile = useMediaQuery(['(max-width: 1024px)'], [true], true);
  // const router = useRouter();

  const authAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      const { data } = await getNonce();
      return data.nonce ?? '';
    },
    createMessage: ({ nonce, address, chainId }) => {
      if (
        formData.firstName &&
        formData.lastName &&
        formData.nick &&
        formData.email
      ) {
        return new SiweMessage({
          domain: window.location.host,
          address,
          statement: `First name: ${formData.firstName}, last name: ${formData.lastName}, nick: ${formData.nick}, e-mail: ${formData.email}`,
          uri: window.location.origin,
          version: '1',
          chainId,
          nonce,
        });
      }
      return new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Login with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      });
    },
    getMessageBody: ({ message }) => {
      return message.prepareMessage();
    },
    verify: async ({ message, signature }) => {
      //TODO creat user
      //TODO Wrap in promise
      return new Promise(async (resolve, reject) => {
        // if (
        //   formData.firstName &&
        //   formData.lastName &&
        //   formData.nick &&
        //   formData.email
        // ) {
        //   const response = await signIn('credentials', {
        //     message: JSON.stringify(message),
        //     signature,
        //     formData: JSON.stringify(formData),
        //     redirect: false,
        //   });
        //   if (response?.error) {
        //     const data = JSON.parse(response.error);

        //     toast(
        //       (t) => (
        //         <span>
        //           <span className="flex items-center justify-between">
        //             <h6 className="py-2">Validation Error</h6>
        //             <Close onClick={() => toast.dismiss(t.id)} />
        //           </span>
        //           <ul className="px-4 flex flex-col gap-3 list-['📌']">
        //             {data.errors.map((error: ApiError) => (
        //               <li key={error.code}>{error.message}</li>
        //             ))}
        //           </ul>
        //         </span>
        //       ),
        //       { duration: Infinity, id: 'validationError' }
        //     );
        //     dispatch(setErrors(data.errors));
        //     return false;
        //   } else {
        //     router.push('/dashboard');
        //     return true;
        //   }
        // } else {
        //TODO sign in
        //1 send back message
        // if succes set user data and session, if not ...

        // const success = await verify(message, signature);
        (await verify(message, signature)) ? resolve(true) : reject(false);
        // try {
        //   const { data } = await verifyMessage({ message, signature });
        //   setUser(data.user);
        //   setStatus('authenticated');
        //   router.push('/dashboard');
        //   // console.log(res);
        // } catch (err: unknown) {
        //   if (axios.isAxiosError(err)) {
        //     toast.error(err.response?.data.error[0].message);
        //   }
        //   toast.error('Something went wrong ! You can not login now.');
        //   reject(false);
        // }

        // signIn('credentials', {
        //   message: JSON.stringify(message),
        //   signature,
        //   redirect: true,
        //   callbackUrl: `${window.location.origin}/${
        //     router.query?.callback ?? '/dashboard'
        //   }`,
        // });
        resolve(true);
        // }
      });
    },
    signOut: async () => {
      logout();
      // setStatus('unauthenticated');
      // status === 'authenticated' && signOut({ callbackUrl: `${window.location.origin}/login` });
      // status === 'authenticated' &&
      // signOut({ callbackUrl: `${window.location.origin}/login` });
    },
  });

  return (
    <RainbowKitAuthenticationProvider
      adapter={authAdapter}
      status={status}
    >
      <RainbowKitProvider
        coolMode
        chains={chains}
        modalSize={isMobile ? 'compact' : 'wide'}
      >
        {children}
      </RainbowKitProvider>
    </RainbowKitAuthenticationProvider>
  );
};

const WagmiProvider = ({ children }: { children: ReactNode }) => {
  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>;
};

export { WagmiProvider, RainbowKitProviders };
