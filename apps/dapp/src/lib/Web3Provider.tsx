'use client';
import { getNonce } from '@/api/auth';
import { useSignUpForm } from '@/modules/SignUpForm/hooks/useSignUpForm';
import { useMediaQuery } from '@/shared/hooks';
import { errorToast } from '@/shared/ui';
import { useTipper } from '@/shared/User/hooks/useTipper';
import { useUser } from '@/shared/User/hooks/useUser';
import {
  createAuthenticationAdapter,
  getDefaultWallets,
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { usePathname } from 'next/navigation';
import { ReactNode, useMemo } from 'react';
import { SiweMessage } from 'siwe';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { hardhat, mainnet, polygon } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import { AuthStatus } from '../types';

const { chains, provider } = configureChains(
  [hardhat, mainnet, polygon],
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
  const pathname = usePathname();
  const {
    setUser,
    status: statusUser,
    logout: logoutUser,
    verifyUserMessage,
  } = useUser();
  const {
    verifyTipperMessage,
    status: statusTipper,
    logout: logoutTipper,
  } = useTipper();
  const { register } = useSignUpForm();
  const isMobile = useMediaQuery(['(max-width: 1024px)'], [true], true);

  const isTipperPath = useMemo(
    () => ['/u'].some((partOfPath) => pathname?.includes(partOfPath)),
    [pathname]
  );
  const isUserPath = useMemo(
    () =>
      [
        '/login',
        '/signup',
        '/balance',
        '/creator',
        '/dashboard',
        '/page',
        '/settings',
        '/tips',
        '/token',
      ].some((partOfPath) => pathname?.includes(partOfPath)),
    [pathname]
  );

  const status: AuthStatus = useMemo(() => {
    if (isUserPath) {
      return statusUser;
    } else if (isTipperPath) {
      return statusTipper;
    }
    return 'unauthenticated';
  }, [isUserPath, isTipperPath]);

  const authAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      const data = await getNonce();
      return data.nonce ?? '';
    },
    createMessage: ({ nonce, address, chainId }) => {
      if (pathname?.includes('signup')) {
        // const { email, firstName, lastName, nick } = data;
        return new SiweMessage({
          domain: window.location.host,
          address,
          // statement: `Your account details: first name: ${firstName}, last name: ${lastName}, nick: ${nick}, e-mail: ${email}`,
          statement: `Sign up with Ethereum to the app.`,
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
        if (pathname?.includes('signup')) {
          const registerRequest = await register(message, signature);
          registerRequest ? resolve(true) : reject(false);
        } else if (pathname?.includes('login')) {
          (await verifyUserMessage(message, signature))
            ? resolve(true)
            : reject(false);
        } else if (isTipperPath) {
          (await verifyTipperMessage(message, signature))
            ? resolve(true)
            : reject(false);
        }
        reject(false);
      });
    },
    signOut: async () => {
      if (isUserPath) {
        logoutUser() ??
          errorToast(
            "You can't logout as user from this url path, return to one of given pages: ('.../streamer/...')"
          );
      }
      if (isTipperPath) {
        logoutTipper() ??
          errorToast(
            "You can't logout as tipper from this url path, return to one of given pages: ('.../u/streamer')"
          );
      }
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
