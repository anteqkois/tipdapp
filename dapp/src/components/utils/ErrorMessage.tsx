import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const ErrorMessage = ({ children }: Props) => {
  return (
    <h6 className="text-danger text-center flex-center">
      <ExclamationCircleIcon className="icon bg-transparent stroke-danger-600 stroke-2" />
      {children}
    </h6>
  );
};

export default ErrorMessage;
