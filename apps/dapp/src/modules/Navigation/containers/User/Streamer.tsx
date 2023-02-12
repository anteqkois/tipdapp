'use client';

import { useMediaQuery } from '@/shared/hooks';
import { useUser } from '@/shared/User/hooks/useUser';
import {
  AdjustmentsHorizontalIcon,
  BanknotesIcon,
  ChatBubbleBottomCenterTextIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  CurrencyDollarIcon,
  RectangleGroupIcon,
} from '@heroicons/react/24/outline';
import { NavigationOption } from '../../types';
import {Desktop} from './Desktop';
import {Mobile} from './Mobile';

const mobileNavigationOption: NavigationOption[] = [
  {
    label: 'dashboard',
    href: '/streamer/dashboard',
    icon: <RectangleGroupIcon className="w-7" />,
  },
  {
    label: 'tips',
    href: '/streamer/tips',
    icon: <ChatBubbleBottomCenterTextIcon className="w-7" />,
  },
  {
    label: 'creator',
    href: '/streamer/creator',
    icon: <AdjustmentsHorizontalIcon className="w-7" />,
  },
  {
    label: 'token',
    href: '/streamer/token',
    icon: <CurrencyDollarIcon className="w-7" />,
  },
  {
    label: 'your page',
    href: '/streamer/page',
    icon: <ComputerDesktopIcon className="w-7" />,
  },
  {
    label: 'balance',
    href: '/streamer/balance',
    icon: <BanknotesIcon className="w-7" />,
  },
  {
    label: 'settings',
    href: '/streamer/settings',
    icon: <Cog6ToothIcon className="w-7" />,
  },
];

const desktopNavigationOption: NavigationOption[] = [
  {
    tooltipLabel: 'Dashboard',
    href: '/streamer/dashboard',
    icon: <RectangleGroupIcon className="w-8" />,
  },
  {
    tooltipLabel: 'tips',
    href: '/streamer/tips',
    icon: <ChatBubbleBottomCenterTextIcon className="w-8" />,
  },
  {
    tooltipLabel: 'Widget creator',
    href: '/streamer/creator',
    icon: <AdjustmentsHorizontalIcon className="w-8" />,
  },
  {
    tooltipLabel: 'Your token settings',
    href: '/streamer/token',
    icon: <CurrencyDollarIcon className="w-8" />,
  },
  {
    tooltipLabel: 'Your page',
    href: '/streamer/page',
    icon: <ComputerDesktopIcon className="w-8" />,
  },
  {
    tooltipLabel: 'Tokens balance',
    href: '/streamer/balance',
    icon: <BanknotesIcon className="w-8" />,
  },
  {
    tooltipLabel: 'Settings',
    href: '/streamer/settings',
    icon: <Cog6ToothIcon className="w-8" />,
  },
];

// TODO add tabindex to desktop version

export const StreamerNav = () => {
  const isMobile = useMediaQuery<boolean>(
    ['(max-width: 1024px)'],
    [true],
    false
  );
  const { user } = useUser();

  return isMobile ? (
    <Mobile
      user={user}
      navigationOption={mobileNavigationOption}
    />
  ) : (
    <Desktop navigationOption={desktopNavigationOption} />
  );
};
