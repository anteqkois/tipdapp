import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export const ErrorPage = ({ children, className }: Props) => (
  <div className="flex h-screen w-screen items-center justify-center">
    <h6 className={`flex-center text-center text-danger ${className}`}>
      <ExclamationCircleIcon className="icon bg-transparent stroke-danger-600 stroke-2" />
      {children}
    </h6>
  </div>
);
