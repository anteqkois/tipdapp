import Link from 'next/link';
import { useRouter } from 'next/router';

const Navlink = ({ className, classActive, href, children, ...props }) => {
  const router = useRouter();

  return (
    <Link {...props} href={href}>
      <a className={`${className} ${router.pathname.includes(href) && classActive}`}>{children}</a>
    </Link>
  );
};

export default Navlink;
