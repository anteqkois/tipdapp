import { Provider } from 'react-redux';
import store from '../src/redux/store.js';
import { EthersProvider } from '../src/hooks/useEthers.jsx';
import '../src/styles/globals.css';
import { Toaster } from 'react-hot-toast';
import Layout from '@/components/Layout.jsx';

function MyApp({ Component, pageProps }) {

  if(Component.getLayout){
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <Provider store={store}>
      <EthersProvider>
        <Layout>
          <Toaster position="top-center" reverseOrder={false} />
          <Component {...pageProps} />
        </Layout>
      </EthersProvider>
    </Provider>
  );
}

export default MyApp;
