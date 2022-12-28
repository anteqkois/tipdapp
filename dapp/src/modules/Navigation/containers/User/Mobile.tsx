'use client';
import { UserSession } from '@tipdapp/server';
import classNames from 'classnames';
import { useState } from 'react';
import { Hamburger, Navlink, RainbowKitButtonMobile } from '../../components';
import { NavigationOption } from '../../types';

const defaultOptionStyle =
  'flex items-center gap-3 p-4 border-b border-neutral-150 font-semibold uppercase group text-neutral-600 hover:text-neutral-900 hover:cursor-pointer hover:bg-neutral-150';

type Props = {
  user?: UserSession;
  navigationOption: NavigationOption[];
};

const Mobile = ({ user, navigationOption }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-12 bg-neutral-50 px-2 grid grid-cols-[50px_auto_45px] gap-5 items-center z-30 shadow-md">
        <div className="flex-center">LOGO</div>
        <p className="text-lg underline flex-center decoration-2 decoration-primary">
          {user?.nick}
        </p>
        <Hamburger
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
      <nav
        className={classNames(
          'fixed top-12 -left-full p-2 w-full h-full bg-neutral-50 duration-300 shadow-md z-30',
          [isOpen ? 'translate-x-full' : 'translate-y-0']
        )}
      >
        <ul className="flex flex-col min-h-[calc(100%-3rem)]">
          <ul>
            {navigationOption.map(({ label, href, icon, className }) => (
              <li
                key={href}
                onClick={() => setIsOpen(false)}
              >
                <Navlink
                  href={href}
                  className={`${defaultOptionStyle} ${className}`}
                >
                  {icon}
                  {label}
                </Navlink>
              </li>
            ))}
          </ul>
          <li>
            <RainbowKitButtonMobile classNameButton={defaultOptionStyle} />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Mobile;
