import { AdjustmentsIcon, AnnotationIcon, CashIcon, CogIcon, CurrencyDollarIcon, TemplateIcon } from '@heroicons/react/outline';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CustomConnectButton } from '../utils/CustomConnectButton';
import Tooltip from '../utils/Tooltip';
import Navlink from './Navlink';

const optionStyle = 'flex p-3 rounded-xl hover:cursor-pointer hover:bg-neutral-200';
const optionStyleActive = 'bg-primary-600 hover:bg-primary-600 stroke-neutral-150';

const navigationOption = [
  {
    tooltipLabel: 'Dashboard',
    href: '/dashboard',
    icon: <TemplateIcon className="w-8" />,
    className: optionStyle,
  },
  {
    tooltipLabel: 'tips',
    href: '/tips',
    icon: <AnnotationIcon className="w-8" />,
    className: optionStyle,
  },
  {
    tooltipLabel: 'Widget creator',
    href: '/creator',
    icon: <AdjustmentsIcon className="w-8" />,
    className: optionStyle,
  },
  {
    tooltipLabel: 'Your token settings',
    href: '/token',
    icon: <CurrencyDollarIcon className="w-8" />,
    className: optionStyle,
  },
  {
    tooltipLabel: 'Tokens balance',
    href: '/balance',
    icon: <CashIcon className="w-8" />,
    className: optionStyle,
  },
  {
    tooltipLabel: 'Settings',
    href: '/settings',
    icon: <CogIcon className="w-8" />,
    className: optionStyle,
  },
];

const Desktop = ({ user, logout }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-32 bg-neutral-50 shadow-md px-2 grid grid-cols-[170px_auto_170px] gap-5 place-items-center z-30">
      <div className="flex-center">LOGO</div>
      <nav>
        <ul className="flex shadow-md p-2 m-3 w-fit rounded-xl bg-neutral-100">
          {navigationOption.map(({ tooltipLabel, href, icon, className }) => (
            <Tooltip key={href} content={tooltipLabel} placement="bottom">
              <li>
                <Navlink href={href} classActive={optionStyleActive} className={optionStyle}>
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
