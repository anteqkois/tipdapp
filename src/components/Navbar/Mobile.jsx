import {
  AdjustmentsIcon,
  AnnotationIcon,
  CashIcon,
  CogIcon,
  CurrencyDollarIcon,
  LogoutIcon,
  TemplateIcon,
} from '@heroicons/react/outline';
import { useState } from 'react';
import Hamburger from './Hamburger';
import Navlink from './Navlink';

const classOption =
  'flex items-center gap-3 p-4 font-semibold uppercase group rounded-xl text-neutral-600 hover:text-neutral-900 hover:cursor-pointer hover:bg-neutral-150';

const navigationOption = [
  {
    label: 'dashboard',
    href: '/dashboard',
    icon: <TemplateIcon className="w-7" />,
    className: classOption,
  },
  {
    label: 'tips',
    href: '/tips',
    icon: <AnnotationIcon className="w-7" />,
    className: classOption,
  },
  {
    label: 'creator',
    href: '/creator',
    icon: <AdjustmentsIcon className="w-7" />,
    className: classOption,
  },
  {
    label: 'token',
    href: '/token',
    icon: <CurrencyDollarIcon className="w-7" />,
    className: classOption,
  },
  {
    label: 'balance',
    href: '/balance',
    icon: <CashIcon className="w-7" />,
    className: classOption,
  },
  {
    label: 'settings',
    href: '/settings',
    icon: <CogIcon className="w-7" />,
    className: classOption,
  },
];

const Mobile = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-12 bg-neutral-50 px-2 grid grid-cols-[50px_auto_45px] gap-5 items-center z-50 shadow-md">
        <div className="flex-center">LOGO</div>
        <p className="text-lg underline flex-center decoration-2 decoration-primary-600">{user.nick}</p>
        <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <nav
        className={`fixed top-12 -left-full p-2 w-full h-full bg-neutral-50 duration-300 shadow-md z-50 ${
          isOpen ? 'translate-x-full' : 'translate-y-0'
        }`}
      >
        <ul>
          {navigationOption.map(({ label, href, icon, className }) => (
            <li onClick={() => setIsOpen(false)}>
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
          >
            <div
              className={classOption}
            >
              <LogoutIcon className="w-7 ml-0.5 -mr-0.5" />
              logout
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Mobile;
