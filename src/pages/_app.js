import UserLayout from '@/components/UserLayout.jsx';
import { ModalProvider } from '@/hooks/useModal';
import ReduxProvider from '@/services/ReduxProvider.jsx';
import Web3Provider from '@/services/Web3Provider.jsx';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import '../globals.css';

function MyApp({ Component, pageProps }) {
  // if (Component.getLayout) {
  //   return Component.getLayout(<Component {...pageProps} />);
  // }

  return (
    <Web3Provider>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <ModalProvider />
        <Toaster position="top-center" reverseOrder={false} />
        {Component.getLayout ? (
          Component.getLayout(<Component {...pageProps} />)
        ) : (
          <ReduxProvider>
            <UserLayout>
              <Component {...pageProps} />
            </UserLayout>
          </ReduxProvider>
        )}
      </SessionProvider>
    </Web3Provider>
  );
}

export default MyApp;
