import UserLayout from '@/components/UserLayout.jsx';
import ProtectPageGuard from '@/components/utils/ProtectPageGuard';
import { ModalProvider } from '@/hooks/useModal';
import ReduxProvider from '@/services/ReduxProvider.jsx';
import { RainbowKitProviders, WagmiProvider } from '@/services/Web3Provider.jsx';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import '../globals.css';

function MyApp({ Component, pageProps }) {
  // if (Component.getLayout) {
  //   return Component.getLayout(<Component {...pageProps} />);
  // }

  return (
    <WagmiProvider>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <RainbowKitProviders>
          <ModalProvider />
          <Toaster position="top-center" reverseOrder={false} />
          <ProtectPageGuard protect={Component?.isProtected}>
            {Component.getLayout ? (
              Component.getLayout(<Component {...pageProps} />)
            ) : (
              <ReduxProvider>
                <UserLayout>
                  <Component {...pageProps} />
                </UserLayout>
              </ReduxProvider>
            )}
          </ProtectPageGuard>
        </RainbowKitProviders>
      </SessionProvider>
    </WagmiProvider>
  );
}

export default MyApp;
