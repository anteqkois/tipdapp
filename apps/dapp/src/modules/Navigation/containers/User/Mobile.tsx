'use client';

import { UserSessionDapp } from '@/shared/User/types';
import classNames from 'classnames';
import { useState } from 'react';
import { Hamburger, Navlink, RainbowKitButtonMobile } from '../../components';
import { NavigationOption } from '../../types';

const defaultOptionStyle =
  'flex items-center gap-3 p-4 border-b border-neutral-150 font-semibold uppercase group text-neutral-600 hover:text-neutral-900 hover:cursor-pointer hover:bg-neutral-150';

type Props = {
  user?: UserSessionDapp;
  navigationOption: NavigationOption[];
};

export const Mobile = ({ user, navigationOption }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="fixed top-0 left-0 z-30 grid h-12 w-full grid-cols-[50px_auto_45px] items-center gap-5 bg-neutral-50 px-2 shadow-md">
        <div className="flex-center">LOGO</div>
        <p className="flex-center text-lg underline decoration-primary decoration-2">
          {user?.nick}
        </p>
        <Hamburger
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
      <nav
        className={classNames(
          'fixed top-12 -left-full z-30 h-full w-full bg-neutral-50 p-2 shadow-md duration-300',
          [isOpen ? 'translate-x-full' : 'translate-y-0']
        )}
      >
        <ul className="flex min-h-[calc(100%-3rem)] flex-col">
          <ul>
            {navigationOption.map(({ label, href, icon, className }) => (
              <li key={href}>
                <Navlink
                  onClick={() => setIsOpen(false)}
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
