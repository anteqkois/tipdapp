import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const ErrorMessage = ({ children }: Props) => {
  return <div className="text-danger-800">Error: {children}</div>;
};

export default ErrorMessage;
