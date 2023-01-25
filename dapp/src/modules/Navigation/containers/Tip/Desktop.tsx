import { Button, CustomConnectButton } from '@/shared/ui';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { NavigationOption } from '../../types';

type Props = {
  navigationOption: NavigationOption[];
};

export const Desktop = ({ navigationOption }: Props) => {
  const { openConnectModal } = useConnectModal();
  return (
    <div className="fixed top-0 left-0 z-30 w-full px-2">
      <div className="flex items-center justify-between w-full h-16 gap-5 mx-auto max-w-7xl">
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
            <Link href={'signup'}>
              <Button variant="special">Sign Up</Button>
            </Link>
          </ul>
        </nav>
        <div className="flex gap-2 w-[170px]">
          <CustomConnectButton />
        </div>
      </div>
    </div>
  );
};
