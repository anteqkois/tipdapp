import UserLayout from '@/components/UserLayout';
import { ProtectPageGuard } from '@/components/utils';
import { ModalProvider, UserProvider } from '@/hooks';
import { ReduxProvider } from '@/lib/redux/ReduxProvider';
import { RainbowKitProviders, WagmiProvider } from '@/lib/Web3Provider';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import '../globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  // if (Component.getLayout) {
  //   return Component.getLayout(<Component {...pageProps} />);
  // }

  return (
    <WagmiProvider>
      <ReduxProvider>
        <UserProvider>
          <RainbowKitProviders>
            <ModalProvider />
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
            <ProtectPageGuard protect={Component?.isProtected}>
              {Component.getLayout ? (
                Component.getLayout(<Component {...pageProps} />)
              ) : (
                <UserLayout>
                  <Component {...pageProps} />
                </UserLayout>
              )}
            </ProtectPageGuard>
          </RainbowKitProviders>
        </UserProvider>
      </ReduxProvider>
    </WagmiProvider>
  );
}

export default MyApp;
