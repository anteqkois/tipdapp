import { Button, CustomConnectButton } from '@/shared/ui';
import Link from 'next/link';
import { NavigationOption } from '../../types';

type Props = {
  navigationOption: NavigationOption[];
};

export const Desktop = ({ navigationOption }: Props) => (
  <div className="absolute top-0 left-0 z-30 w-full px-2">
    <div className="mx-auto flex h-24 w-full max-w-7xl items-center justify-between gap-5">
      <div className="w-[170px]">LOGO</div>
      <nav>
        <ul className="flex gap-1">
          {navigationOption.map(({ href, label }) => (
            <li key={href}>
              <Button
                className="px-4 py-2"
                variant="clear"
              >
                <h6 className="text-neutral-300 hover:text-neutral-150">
                  {label}
                </h6>
              </Button>
            </li>
          ))}
          <Link href="signup">
            <Button
              // variant="clear"
              variant="overlay"
            >
              Sign Up
            </Button>
          </Link>
        </ul>
      </nav>
      <div className="flex w-[170px] gap-2">
        <CustomConnectButton />
      </div>
    </div>
  </div>
);
