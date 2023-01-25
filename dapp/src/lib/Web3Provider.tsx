'use client';
import { getNonce } from '@/api/auth';
import { useSignUpForm } from '@/modules/SignUpForm/hooks/useSignUpForm';
import { useMediaQuery } from '@/shared/hooks';
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

  const isTipperPath = useMemo(() => pathname?.includes('u'), [pathname]);

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
      logoutUser();
      logoutTipper();
    },
  });

  return (
    <RainbowKitAuthenticationProvider
      adapter={authAdapter}
      status={isMobile ? statusTipper : statusUser}
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
