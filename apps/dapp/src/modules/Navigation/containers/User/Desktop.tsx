'use client';

import { CustomConnectButton, Tooltip } from '@/shared/ui';
import { Navlink } from '../../components';
import { NavigationOption } from '../../types';

const defaultOptionStyle =
  'flex p-3 rounded hover:cursor-pointer hover:bg-neutral-200';
const defaultOptionStyleActive =
  'bg-primary hover:bg-primary stroke-neutral-150';

type Props = {
  navigationOption: NavigationOption[];
};

export const Desktop = ({ navigationOption }: Props) => (
  <div className="fixed top-0 left-0 z-30 grid h-28 w-full grid-cols-[170px_auto_170px] place-items-center gap-5 bg-neutral-50 px-2 shadow-md">
    <div className="flex-center">LOGO</div>
    <nav>
      <ul className="m-3 flex w-fit rounded bg-neutral-100 p-2 shadow-md">
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
