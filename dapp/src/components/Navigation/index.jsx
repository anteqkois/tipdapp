import { useMediaQuery, useUser } from '@/hooks';
import Desktop from './Desktop';
import Mobile from './Mobile';

//TODO add tabindex to desktop version

const Navigation = () => {
  const isMobile = useMediaQuery('(max-width: 1024px)', true);
  const { logout, user } = useUser();

  return isMobile ? <Mobile user={user} logout={logout} /> : <Desktop user={user} logout={logout} />;
};

export default Navigation;
