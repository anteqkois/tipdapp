import UserLayout from '@/components/UserLayout.jsx';
import { ModalProvider } from '@/hooks/useModal';
import { Toaster } from 'react-hot-toast';
import ReduxProvider from 'src/services/ReduxProvider';
import Web3Provider from 'src/services/Web3Provider.jsx';
import '../globals.css';

function MyApp({ Component, pageProps }) {
  // if (Component.getLayout) {
  //   return Component.getLayout(<Component {...pageProps} />);
  // }

  return (
    <Web3Provider>
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
    </Web3Provider>
  );
}

export default MyApp;
