import { ReactNode } from 'react';

const NotFound = () => {
  return <h1>404 - Page Not Found</h1>;
};

type Props = {
  children: ReactNode;
};

NotFound.getLayout = ({ children }: Props) => {
  return children;
};

export default NotFound;
