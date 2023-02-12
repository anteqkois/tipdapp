import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export const ErrorMessage = ({ children, className }: Props) => (
  <h6 className={`flex-center text-center text-danger ${className}`}>
    <ExclamationCircleIcon className="icon bg-transparent stroke-danger-600 stroke-2" />
    {children}
  </h6>
);