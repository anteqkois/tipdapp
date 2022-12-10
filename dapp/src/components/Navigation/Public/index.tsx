'use client';
import { Button } from '@/components/utils';
import { useMediaQuery } from '@/hooks';
import { NavigationOption } from '@/types';
import { Desktop } from './Desktop';
import { Mobile } from './Mobile';

const optionStyle =
  'flex p-3 rounded hover:cursor-pointer hover:bg-neutral-200';
const optionStyleActive = 'bg-primary hover:bg-primary stroke-neutral-150';

const navigationOption: NavigationOption[] = [
  {
    label: 'User Tokens',
    href: '/userTokens',
    className: optionStyle,
  },
  {
    label: 'How Works',
    href: '/howWorks',
    className: optionStyle,
  },
  {
    label: 'Tutorials',
    href: '/tutorials',
    className: optionStyle,
  },
  {
    label: 'Pricing',
    href: '/pricing',
    className: optionStyle,
  },
];

export const PublicNav = () => {
    const isMobile = useMediaQuery<boolean>(
      ['(max-width: 1024px)'],
      [true],
      false
    );

    return isMobile ? (
      <Mobile navigationOption={navigationOption} />
    ) : (
      <Desktop navigationOption={navigationOption} />
    );
};
