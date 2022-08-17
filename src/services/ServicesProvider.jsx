import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { Toaster } from 'react-hot-toast';

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

const ServicesProvider = ({ children }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default ServicesProvider;
