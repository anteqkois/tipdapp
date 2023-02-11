import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

type Props = {
  message?: string;
  children: ReactNode;
};
export const InfoMessage = ({ message, children }: Props) => (
    <h6 className="text-secondary text-center flex-center">
      <InformationCircleIcon className="icon bg-transparent stroke-secondary-600 stroke-2" />
      {children}
    </h6>
  );
