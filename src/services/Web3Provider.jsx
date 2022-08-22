import useMediaQuery from '@/hooks/useMediaQuery';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { Toaster } from 'react-hot-toast';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.hardhat, chain.polygon, chain.optimism, chain.arbitrum],
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

const Web3Provider = ({ children }) => {
  const isMobile = useMediaQuery('(max-width: 1024px)', true);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider coolMode chains={chains} modalSize={isMobile ? 'compact' : 'wide'}>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Web3Provider;
