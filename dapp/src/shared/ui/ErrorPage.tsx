import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export const ErrorPage = ({ children, className }: Props) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <h6 className={`text-danger text-center flex-center ${className}`}>
        <ExclamationCircleIcon className="icon bg-transparent stroke-danger-600 stroke-2" />
        {children}
      </h6>
    </div>
  );
};

export default ErrorPage;
