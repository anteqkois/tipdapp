import '../src/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
// import { Mainnet, Hardhat, DAppProvider, useEtherBalance, useEthers, Config } from '@usedapp/core';
// import { getDefaultProvider } from 'ethers';
import { Toaster } from 'react-hot-toast';
import store from 'src/redux/store';
import { Provider } from 'react-redux';
import UserLayout from '@/components/UserLayout.jsx';

// const config = {
//   readOnlyChainId: Hardhat.chainId,
//   readOnlyUrls: {
//     [Hardhat.chainId]: 'http://127.0.0.1:8545',
//   },
// };

// const config = {
//   readOnlyChainId: Mainnet.chainId,
//   readOnlyUrls: {
//     [Mainnet.chainId]: getDefaultProvider('mainnet'),
//   },
// };

const { chains, provider } = configureChains(
  [chain.mainnet, chain.hardhat, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()],
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

function MyApp({ Component, pageProps }) {
  // if (Component.getLayout) {
  //   return Component.getLayout(<Component {...pageProps} />);
  // }

  return (
    <>
      {/* <DAppProvider config={config}> */}
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Toaster position="top-center" reverseOrder={false} />
          {Component.getLayout ? (
            Component.getLayout(<Component {...pageProps} />)
          ) : (
            <Provider store={store}>
              <UserLayout>
                <Component {...pageProps} />
              </UserLayout>
            </Provider>
          )}
        </RainbowKitProvider>
      </WagmiConfig>
      {/* </DAppProvider> */}
    </>
  );
}

export default MyApp;
