import { Button } from '@/shared/ui';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { NavigationOption } from '../../types';

type Props = {
  navigationOption: NavigationOption[];
};

export const Desktop = ({ navigationOption }: Props) => {
  const { openConnectModal } = useConnectModal();
  return (
    <div className="fixed top-0 left-0 z-30 w-full bg-neutral-50 px-2 shadow-md ">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-5">
        <div className="w-[170px]">LOGO</div>
        <nav>
          <ul className="flex gap-1">
            {navigationOption.map(({ href, className, label }) => (
              <li key={href}>
                <Button
                  className="px-4 py-2"
                  variant="clear"
                >
                  {label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex w-[170px] gap-2">
          <Button
            variant="ghost"
            onClick={openConnectModal}
          >
            Login
          </Button>
          <Link href={'signup'}>
            <Button variant="special">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
