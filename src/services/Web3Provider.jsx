import useMediaQuery from '@/hooks/useMediaQuery';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import '@rainbow-me/rainbowkit/styles.css';
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
  // autoConnect: true,
  connectors,
  provider,
});

const RainbowKitProviders = ({ children }) => {
  const isMobile = useMediaQuery('(max-width: 1024px)', true);

  return (
    <RainbowKitSiweNextAuthProvider>
      <RainbowKitProvider coolMode chains={chains} modalSize={isMobile ? 'compact' : 'wide'}>
        {children}
      </RainbowKitProvider>
    </RainbowKitSiweNextAuthProvider>
  );
};

const WagmiProvider = ({ children }) => {
  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>;
};
export { WagmiProvider, RainbowKitProviders };
export default { WagmiProvider, RainbowKitProviders };
