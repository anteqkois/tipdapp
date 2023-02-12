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
    <div className="fixed top-0 left-0 z-30 w-full bg-neutral-50 px-2 shadow-md ">
      <div className="mx-auto flex h-12 w-full max-w-7xl items-center justify-between gap-5">
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
            'fixed top-12 -left-full z-30 h-full w-full bg-neutral-50 p-2 shadow-md duration-300',
            [isOpen ? 'translate-x-full' : 'translate-y-0']
          )}
        >
          <ul className="flex min-h-[calc(100%-3rem)] flex-col">
            <ul>
              <li
                className={`${defaultOptionStyle} flex flex-col hover:bg-transparent`}
              >
                <Navlink
                  className="w-full"
                  href="/signup"
                >
                  <Button
                    variant="special"
                    className="w-full"
                  >
                    SignUp
                  </Button>
                </Navlink>
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