import classNames from 'classnames';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
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
  const router = useRouter();

  return (
    <Link
      {...props}
      href={href}
    >
      <a
        className={classNames(className, [
          router.pathname.includes(href.toString()) && classNameActive,
        ])}
      >
        {children}
      </a>
    </Link>
  );
};

export default Navlink;
