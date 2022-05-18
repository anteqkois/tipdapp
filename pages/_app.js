// import { Provider } from 'react-redux';
// import store from '../src/redux/store.js';
import { EthersProvider } from '../src/hooks/useEthers.jsx';
import '../src/styles/globals.css';
import { Toaster } from 'react-hot-toast';
import Layout from '@/components/Layout.jsx';
import { Mainnet, Hardhat, DAppProvider, useEtherBalance, useEthers, Config } from '@usedapp/core';
import { getDefaultProvider } from 'ethers';

let config;

switch (process.env.STATE) {
  case 'dev-local':
    config = {
      readOnlyChainId: Hardhat.chainId,
      readOnlyUrls: {
        [Hardhat.chainId]: 'http://127.0.0.1:8545',
      },
    };
    break;
  case 'production':
    config = {
      readOnlyChainId: Mainnet.chainId,
      readOnlyUrls: {
        [Mainnet.chainId]: getDefaultProvider('mainnet'),
      },
    };
    break;
}

function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <DAppProvider config={config}>
      <Layout>
        <Toaster position="top-center" reverseOrder={false} />
        <Component {...pageProps} />
      </Layout>
    </DAppProvider>
  );
}

export default MyApp;

{
  /* <EthersProvider> */
}
{
  /* </EthersProvider> */
}
// <Provider store={store}>
{
  /* </Provider> */
}
