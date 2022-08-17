import '../src/styles/globals.css';
import store from 'src/redux/store';
import { Provider } from 'react-redux';
import UserLayout from '@/components/UserLayout.jsx';
import ServicesProvider from 'src/services/ServicesProvider.jsx';

function MyApp({ Component, pageProps }) {
  // if (Component.getLayout) {
  //   return Component.getLayout(<Component {...pageProps} />);
  // }

  return (
    <ServicesProvider>
      {Component.getLayout ? (
        Component.getLayout(<Component {...pageProps} />)
      ) : (
        <Provider store={store}>
          <UserLayout>
            <Component {...pageProps} />
          </UserLayout>
        </Provider>
      )}
    </ServicesProvider>
  );
}

export default MyApp;
