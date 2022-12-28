import { Button } from '@/shared/ui';
import { NavigationOption } from '../../types';

type Props = {
  navigationOption: NavigationOption[];
};

export const Desktop = ({ navigationOption }: Props) => {
  return (
    <div className="fixed top-0 left-0 z-30 w-full px-2 shadow-md bg-neutral-50 ">
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
          </ul>
        </nav>
        <div className="flex gap-2 w-[170px]">
          <Button variant="ghost">Login</Button>
          <Button variant="special">Sign Up</Button>
        </div>
      </div>
    </div>
  );
};
