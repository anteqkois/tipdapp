import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

type Props = {
  children: ReactNode;
};

const ReduxProvider = ({ children }: Props) => (
  <Provider store={store}>{children}</Provider>
);

export { ReduxProvider };
