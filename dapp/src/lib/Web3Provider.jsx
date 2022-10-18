import { Close } from '@/components/utils/Close';
import useMediaQuery from '@/hooks/useMediaQuery';
import { selectFormData, setErrors } from '@/lib/redux/signUpFormSlice';
import {
  createAuthenticationAdapter,
  getDefaultWallets,
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { SiweMessage } from 'siwe';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import { getCsrfToken, signIn, signOut, useSession } from './useSession';

const { chains, provider } = configureChains(
  [chain.hardhat, chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: (chain) => ({
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

const RainbowKitProviders = ({ children, enabled }) => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const isMobile = useMediaQuery(['(max-width: 1024px)'], [true], true);
  const { status } = useSession();
  const router = useRouter();

  const authAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      const response = await getCsrfToken();
      return response ?? '';
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
      return new Promise(async (resolve, reject) => {
        if (
          formData.firstName &&
          formData.lastName &&
          formData.nick &&
          formData.email
        ) {
          const response = await signIn('credentials', {
            message: JSON.stringify(message),
            signature,
            formData: JSON.stringify(formData),
            redirect: false,
          });
          if (response?.error) {
            const data = JSON.parse(response.error);

            toast(
              (t) => (
                <span>
                  <span className="flex items-center justify-between">
                    <h6 className="py-2">Validation Error</h6>
                    <Close onClick={() => toast.dismiss(t.id)} />
                  </span>
                  <ul className="px-4 flex flex-col gap-3 list-['📌']">
                    {data.errors.map((error) => (
                      <li key={error.code}>{error.message}</li>
                    ))}
                  </ul>
                </span>
              ),
              { duration: Infinity, id: 'validationError' }
            );
            dispatch(setErrors(data.errors));
            reject(false);
          } else {
            router.push('/dashboard');
            resolve(true);
          }
        } else {
          signIn('credentials', {
            message: JSON.stringify(message),
            signature,
            redirect: true,
            callbackUrl: `${window.location.origin}/${
              router.query?.callback ?? '/dashboard'
            }`,
          });
          resolve(true);
        }
      });
    },
    signOut: async () => {
      // status === 'authenticated' && signOut({ callbackUrl: `${window.location.origin}/login` });
      status === 'authenticated' &&
        signOut({ callbackUrl: `${window.location.origin}/login` });
    },
  });

  return (
    <RainbowKitAuthenticationProvider
      adapter={authAdapter}
      enabled={enabled}
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

const WagmiProvider = ({ children }) => {
  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>;
};

export { WagmiProvider, RainbowKitProviders };
