import {
  AdjustmentsHorizontalIcon, ArrowRightOnRectangleIcon, BanknotesIcon, ChatBubbleBottomCenterTextIcon, Cog6ToothIcon, ComputerDesktopIcon, CurrencyDollarIcon, RectangleGroupIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import Hamburger from './Hamburger';
import Navlink from './Navlink';

const optionStyle =
  'flex items-center gap-3 p-4 font-semibold uppercase group rounded text-neutral-600 hover:text-neutral-900 hover:cursor-pointer hover:bg-neutral-150';

const navigationOption = [
  {
    label: 'dashboard',
    href: '/dashboard',
    icon: <RectangleGroupIcon className="w-7" />,
    className: optionStyle,
  },
  {
    label: 'tips',
    href: '/tips',
    icon: <ChatBubbleBottomCenterTextIcon className="w-7" />,
    className: optionStyle,
  },
  {
    label: 'creator',
    href: '/creator',
    icon: <AdjustmentsHorizontalIcon className="w-7" />,
    className: optionStyle,
  },
  {
    label: 'token',
    href: '/token',
    icon: <CurrencyDollarIcon className="w-7" />,
    className: optionStyle,
  },
  {
    label: 'your page',
    href: '/page',
    icon: <ComputerDesktopIcon className="w-7" />,
    className: optionStyle,
  },
  {
    label: 'balance',
    href: '/balance',
    icon: <BanknotesIcon className="w-7" />,
    className: optionStyle,
  },
  {
    label: 'settings',
    href: '/settings',
    icon: <Cog6ToothIcon className="w-7" />,
    className: optionStyle,
  },
];

const Mobile = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-12 bg-neutral-50 px-2 grid grid-cols-[50px_auto_45px] gap-5 items-center z-30 shadow-md">
        <div className="flex-center">LOGO</div>
        <p className="text-lg underline flex-center decoration-2 decoration-primary">{user.nick}</p>
        <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <nav
        className={`fixed top-12 -left-full p-2 w-full h-full bg-neutral-50 duration-300 shadow-md z-30 ${
          isOpen ? 'translate-x-full' : 'translate-y-0'
        }`}
      >
        <ul>
          {navigationOption.map(({ label, href, icon, className }) => (
            <li key={href} onClick={() => setIsOpen(false)}>
              <Navlink href={href} className={className}>
                {icon}
                {label}
              </Navlink>
            </li>
          ))}
          <li
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
            className={optionStyle}
          >
              <ArrowRightOnRectangleIcon className="w-7 ml-0.5 -mr-0.5" />
              logout
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Mobile;