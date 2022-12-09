'use client';
import { getNonce } from '@/api/auth';
import { useMediaQuery, useSignUpForm, useUser } from '@/hooks';
import {
  createAuthenticationAdapter,
  getDefaultWallets,
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
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
  const pathname = usePathname();
  const { setUser, setStatus, status, logout, verify } = useUser();
  const {
    register,
  } = useSignUpForm();
  const isMobile = useMediaQuery(['(max-width: 1024px)'], [true], true);

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
        } else {
          (await verify(message, signature)) ? resolve(true) : reject(false);
        }
        reject(false);
      });
    },
    signOut: async () => {
      logout();
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
