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
      // className="flex gap-1 underline underline-offset-1 decoration-2 decoration-primary cursor-pointer"
      className="inline-block underline underline-offset-1 decoration-2 decoration-primary cursor-pointer"
    >
      {children}
      {icon && <ArrowTopRightOnSquareIcon className="inline-block ml-1 w-4 stroke-2" />}
    </a>
  );
};
