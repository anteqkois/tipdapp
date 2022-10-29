'use client';
import { useMediaQuery, useUser } from '@/hooks';
import Desktop from './Desktop';
import Mobile from './Mobile';

//TODO add tabindex to desktop version

const Navigation = () => {
  const isMobile = useMediaQuery<boolean>(
    ['(max-width: 1024px)'],
    [true],
    false
  );
  const { user } = useUser();

  return isMobile ? <Mobile user={user} /> : <Desktop />;
};

export default Navigation;
