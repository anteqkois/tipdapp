import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { HTMLAttributes, ReactNode } from 'react';

type Props = {
  children: ReactNode;
} & HTMLAttributes<HTMLHeadingElement>;

export const InfoMessage = ({ children, ...rest }: Props) => (
  <h6
    {...rest}
    className="flex-center text-center text-secondary"
  >
    <InformationCircleIcon className="icon bg-transparent stroke-secondary-600 stroke-2" />
    {children}
  </h6>
);
