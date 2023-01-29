import { Button, CustomConnectButton } from '@/shared/ui';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { NavigationOption } from '../../types';

type Props = {
  navigationOption: NavigationOption[];
};

export const Desktop = ({ navigationOption }: Props) => {
  const { openConnectModal } = useConnectModal();

  // const [scrolled, setScrolled] = useState(false);

  // console.log(scrolled);
  // const scrollEvent = useCallback(
  //   (event: Event) => {
  //     if (window.scrollY > 1) {
  //       !scrolled && setScrolled(true);
  //     } else {
  //       scrolled && setScrolled(false);
  //     }
  //   },
  //   [scrolled]
  // );

  // useEffect(() => {
  //   window.addEventListener('scroll', scrollEvent);
  //   return () => {
  //     window.removeEventListener('scroll', scrollEvent);
  //   };
  // }, []);

  return (
    <div className="fixed top-0 left-0 z-30 w-full px-2 bg-primary-700 shadow-neutral-900/50 shadow-2xl">
      {/* <div
      className={`fixed top-0 left-0 z-30 w-full px-2 ${
        scrolled && 'bg-primary-700 shadow-neutral-900/50 shadow-2xl'
      }`}
    > */}
      <div className="flex items-center justify-between w-full h-24 gap-5 mx-auto max-w-7xl">
        <div className="w-[170px]">LOGO</div>
        <nav>
          <ul className="flex gap-1">
            {navigationOption.map(({ href, className, label }) => (
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
            <Link href={'signup'}>
              <Button
                // variant="clear"
                variant="overlay"
                // className="bg-secondary-800 p-2 text-neutral-300 hover:text-neutral-150"
              >
                Sign Up
              </Button>
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
