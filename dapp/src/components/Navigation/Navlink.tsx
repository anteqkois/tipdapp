'use client';
import classNames from 'classnames';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
// import { useRouter } from 'next/router';
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
  // const router = useRouter();

  return (
    <Link
      {...props}
      href={href}
      className={classNames(className, [
        pathname.includes(href.toString()) && classNameActive,
      ])}
    >
      {/* <a */}
      {/* > */}
      {children}
      {/* </a> */}
    </Link>
  );
};

export default Navlink;
