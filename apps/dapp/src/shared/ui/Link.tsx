import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { AnchorHTMLAttributes } from 'react';

type Prps = {
  icon?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link = ({
  icon,
  href,
  target = '_blank',
  children,
  className,
  ...rest
}: Prps) => (
  <a
    {...rest}
    href={href}
    target={target}
    rel="noreferrer"
    className={`inline-flex cursor-pointer underline decoration-primary decoration-2 underline-offset-1 ${className}`}
  >
    {children}
    {icon && (
      <ArrowTopRightOnSquareIcon className="ml-1 inline-block w-4 stroke-2" />
    )}
  </a>
);
