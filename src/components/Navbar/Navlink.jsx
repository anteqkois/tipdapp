import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Navlink = ({ className, classActive, href, children, ...props }) => {
  const router = useRouter();

  return (
    <Link {...props} href={href}>
      <p className={`${className} ${router.pathname.includes(href) && classActive}`}>{children}</p>
    </Link>
  );
};

export default Navlink;
