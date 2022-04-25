import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Navlink = ({ className, classActive, href, children, ...props }) => {
  const router = useRouter();
  console.log(router.pathname.includes(href));
  return (
    <Link {...props} href={href} >
      <p className={`${className} ${router.pathname.includes(href) && classActive}`}>{children}</p>
    </Link>
  );
};
// className={`${className} ${router.pathname.includes(href) && classActive}`}
export default Navlink;
