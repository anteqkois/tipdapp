'use client';
import { CustomConnectButton, Tooltip } from '@/shared/ui';
import {  Navlink } from '../../components';
import { NavigationOption } from '../../types';

const defaultOptionStyle =
  'flex p-3 rounded hover:cursor-pointer hover:bg-neutral-200';
const defaultOptionStyleActive =
  'bg-primary hover:bg-primary stroke-neutral-150';

type Props = {
  navigationOption: NavigationOption[];
};

const Desktop = ({ navigationOption }: Props) => {
  return (
    <div className="fixed top-0 left-0 w-full h-28 bg-neutral-50 shadow-md px-2 grid grid-cols-[170px_auto_170px] gap-5 place-items-center z-30">
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
                  classNameActive={defaultOptionStyleActive}
                  className={`${defaultOptionStyle} ${className}`}
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

export default Desktop;
