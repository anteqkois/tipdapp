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
      className={`inline-block underline cursor-pointer underline-offset-1 decoration-2 decoration-primary ${className}`}
    >
      {children}
      {icon && (
        <ArrowTopRightOnSquareIcon className="inline-block w-4 ml-1 stroke-2" />
      )}
    </a>
  );
