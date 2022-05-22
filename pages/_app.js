import { Mainnet, Hardhat, DAppProvider, useEtherBalance, useEthers, Config } from '@usedapp/core';
import { getDefaultProvider } from 'ethers';
import '../src/styles/globals.css';
import { Toaster } from 'react-hot-toast';
import UserLayout from '@/components/UserLayout.jsx';

const config = {
  readOnlyChainId: Hardhat.chainId,
  readOnlyUrls: {
    [Hardhat.chainId]: 'http://127.0.0.1:8545',
  },
};

// const config = {
//   readOnlyChainId: Mainnet.chainId,
//   readOnlyUrls: {
//     [Mainnet.chainId]: getDefaultProvider('mainnet'),
//   },
// };

function MyApp({ Component, pageProps }) {
  // if (Component.getLayout) {
  //   return Component.getLayout(<Component {...pageProps} />);
  // }

  return (
    <>
      {/* <DAppProvider config={config}> */}
      <Toaster position="top-center" reverseOrder={false} />
      {Component.getLayout ? (
        Component.getLayout(<Component {...pageProps} />)
      ) : (
        <UserLayout>
          <Component {...pageProps} />
        </UserLayout>
      )}
      {/* </DAppProvider> */}
    </>
  );
}

export default MyApp;
