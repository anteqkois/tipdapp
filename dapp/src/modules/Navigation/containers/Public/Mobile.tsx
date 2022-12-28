import { Button } from '@/shared/ui';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import classNames from 'classnames';
import { useState } from 'react';
import { Hamburger, Navlink } from '../../components';
import { NavigationOption } from '../../types';

const defaultOptionStyle =
  'flex items-center gap-3 p-4 border-b border-neutral-150 font-semibold uppercase group text-neutral-600 hover:text-neutral-900 hover:cursor-pointer hover:bg-neutral-150';

type Props = {
  navigationOption: NavigationOption[];
};

export const Mobile = ({ navigationOption }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { openConnectModal } = useConnectModal();

  return (
    <div className="fixed top-0 left-0 z-30 w-full px-2 shadow-md bg-neutral-50 ">
      <div className="flex items-center justify-between w-full h-12 gap-5 mx-auto max-w-7xl">
        <div className="flex-center">LOGO</div>
        {/* <p className="text-lg underline flex-center decoration-2 decoration-primary italic">
          Nice to see you !
        </p> */}
        <Hamburger
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <nav
          className={classNames(
            'fixed top-12 -left-full p-2 w-full h-full bg-neutral-50 duration-300 shadow-md z-30',
            [isOpen ? 'translate-x-full' : 'translate-y-0']
          )}
        >
          <ul className="flex flex-col min-h-[calc(100%-3rem)]">
            <ul>
              <li
                className={`${defaultOptionStyle} hover:bg-transparent flex flex-col`}
              >
                <Button
                  onClick={openConnectModal}
                  variant="special"
                  className="w-full"
                >
                  <Navlink href="/signup">SignUp</Navlink>
                </Button>
                <Button
                  onClick={openConnectModal}
                  variant="ghost"
                  className="w-full"
                >
                  Login
                </Button>
              </li>
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
          </ul>
        </nav>
      </div>
    </div>
  );
};
