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
  ...rest
}: Prps) => {
  return (
    <a
      {...rest}
      href={href}
      target={target}
      rel="noreferrer"
      className="flex gap-1 underline underline-offset-1 decoration-2 decoration-primary cursor-pointer"
    >
      {children}
      {icon && <ArrowTopRightOnSquareIcon className="w-4" />}
    </a>
  );
};
