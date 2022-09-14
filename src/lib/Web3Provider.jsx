import useMediaQuery from '@/hooks/useMediaQuery';
import {
  createAuthenticationAdapter,
  getDefaultWallets,
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { SiweMessage } from 'siwe';
import { selectFields } from 'src/redux/signInFormSlice';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

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
  ],
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
  const fields = useSelector(selectFields);
  const isMobile = useMediaQuery('(max-width: 1024px)', true);
  const { status } = useSession();
  const router = useRouter();

  const authAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      const response = await getCsrfToken();
      return response ?? '';
    },
    createMessage: ({ nonce, address, chainId }) => {
      return new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      });
    },
    getMessageBody: ({ message }) => {
      return message.prepareMessage();
    },
    verify: ({ message, signature }) => {
      signIn('credentials', {
        message: JSON.stringify(message),
        signature, // <-- comment this out to throw an error & reach the error page ./pages/auth/signin.tsx
        fields,
        redirect: true,
        callbackUrl: `${window.location.origin}/${router.query?.callback ?? '/dashboard'}`,
      });
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    },
    signOut: async () => {
      signOut({ callbackUrl: `${window.location.origin}/login` });
    },
  });

  return (
    <RainbowKitAuthenticationProvider adapter={authAdapter} enabled={enabled} status={status}>
      <RainbowKitProvider coolMode chains={chains} modalSize={isMobile ? 'compact' : 'wide'}>
        {children}
      </RainbowKitProvider>
    </RainbowKitAuthenticationProvider>
  );
};

const WagmiProvider = ({ children }) => {
  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>;
};

export { WagmiProvider, RainbowKitProviders };
export default { WagmiProvider, RainbowKitProviders };
