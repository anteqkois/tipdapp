import { Provider } from 'react-redux';
import store from '../redux/store.js';
import { EthersProvider } from '../hooks/useEthers.jsx';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <EthersProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <Component {...pageProps} />
      </EthersProvider>
    </Provider>
  );
}

export default MyApp;
