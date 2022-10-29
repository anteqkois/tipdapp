'use client';
import { NavigationOption } from '@/types';
import {
  AdjustmentsHorizontalIcon,
  BanknotesIcon,
  ChatBubbleBottomCenterTextIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  CurrencyDollarIcon,
  RectangleGroupIcon,
} from '@heroicons/react/24/outline';
import { CustomConnectButton } from '../utils/CustomConnectButton';
import Tooltip from '../utils/Tooltip';
import Navlink from './Navlink';

const optionStyle =
  'flex p-3 rounded hover:cursor-pointer hover:bg-neutral-200';
const optionStyleActive = 'bg-primary hover:bg-primary stroke-neutral-150';

const navigationOption: NavigationOption[] = [
  {
    tooltipLabel: 'Dashboard',
    href: '/dashboard',
    icon: <RectangleGroupIcon className="w-8" />,
    className: optionStyle,
  },
  {
    tooltipLabel: 'tips',
    href: '/tips',
    icon: <ChatBubbleBottomCenterTextIcon className="w-8" />,
    className: optionStyle,
  },
  {
    tooltipLabel: 'Widget creator',
    href: '/creator',
    icon: <AdjustmentsHorizontalIcon className="w-8" />,
    className: optionStyle,
  },
  {
    tooltipLabel: 'Your token settings',
    href: '/token',
    icon: <CurrencyDollarIcon className="w-8" />,
    className: optionStyle,
  },
  {
    tooltipLabel: 'Your page',
    href: '/page',
    icon: <ComputerDesktopIcon className="w-8" />,
    className: optionStyle,
  },
  {
    tooltipLabel: 'Tokens balance',
    href: '/balance',
    icon: <BanknotesIcon className="w-8" />,
    className: optionStyle,
  },
  {
    tooltipLabel: 'Settings',
    href: '/settings',
    icon: <Cog6ToothIcon className="w-8" />,
    className: optionStyle,
  },
];

const Desktop = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-32 bg-neutral-50 shadow-md px-2 grid grid-cols-[170px_auto_170px] gap-5 place-items-center z-30">
      <div className="flex-center">LOGO</div>
      <nav>
        <ul className="flex shadow-md p-2 m-3 w-fit rounded bg-neutral-100">
          {navigationOption.map(({ tooltipLabel, href, icon, className }) => (
            <Tooltip
              key={href}
              content={tooltipLabel as string}
              side="bottom"
            >
              <li>
                <Navlink
                  href={href}
                  classNameActive={optionStyleActive}
                  className={className}
                >
                  {icon}
                </Navlink>
              </li>
            </Tooltip>
          ))}
        </ul>
      </nav>
      <CustomConnectButton />
      {/* <CustomConnectButton user={user} /> */}
    </div>
  );
};

export default Desktop;
