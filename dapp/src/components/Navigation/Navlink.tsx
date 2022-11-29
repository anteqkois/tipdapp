'use client';
import classNames from 'classnames';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { AnchorHTMLAttributes } from 'react';

type Props = {
  classNameActive?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps;

const Navlink = ({
  className,
  classNameActive,
  href,
  children,
  ...props
}: Props) => {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      href={href}
      className={classNames(className, [
        pathname?.includes(href.toString()) && classNameActive,
      ])}
    >
      {children}
    </Link>
  );
};

export default Navlink;
