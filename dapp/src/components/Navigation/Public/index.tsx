'use client';
import { NavigationOption } from '@/types/index';
import {
  AdjustmentsHorizontalIcon,
  ChatBubbleBottomCenterTextIcon,
  RectangleGroupIcon,
} from '@heroicons/react/24/outline';
import { CustomConnectButton } from '../../utils';
import Tooltip from '../../utils/Tooltip';
import Navlink from '../Navlink';

const optionStyle =
  'flex p-3 rounded hover:cursor-pointer hover:bg-neutral-200';
const optionStyleActive = 'bg-primary hover:bg-primary stroke-neutral-150';

const navigationOption: NavigationOption[] = [
  {
    tooltipLabel: 'Dashboard',
    href: '/streamer/dashboard',
    icon: <RectangleGroupIcon className="w-8" />,
    className: optionStyle,
  },
  {
    tooltipLabel: 'tips',
    href: '/streamer/tips',
    icon: <ChatBubbleBottomCenterTextIcon className="w-8" />,
    className: optionStyle,
  },
  {
    tooltipLabel: 'Widget creator',
    href: '/streamer/creator',
    icon: <AdjustmentsHorizontalIcon className="w-8" />,
    className: optionStyle,
  },
];

export const PublicNav = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-32 bg-neutral-50 shadow-md px-2 grid grid-cols-[170px_auto_170px] gap-5 place-items-center z-30">
      <div className="flex-center">LOGO</div>
      <nav>
        <ul className="flex p-2 m-3 rounded shadow-md w-fit bg-neutral-100">
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
    </div>
  );
};
