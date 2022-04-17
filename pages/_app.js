import { Provider } from 'react-redux';
import store from '../redux/store.js';
import { EthersProvider } from '../hooks/useEthers.jsx';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <EthersProvider>
        <Component {...pageProps} />
      </EthersProvider>
    </Provider>
  );
}

export default MyApp;
