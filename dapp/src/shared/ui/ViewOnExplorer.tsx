import { Address, Hash } from '@wagmi/core';
import { useNetwork } from 'wagmi';
import { Link } from './Link';

type Props = {
  subject: 'token' | 'tx' | 'address';
  value: Address | Hash;
  classNames?: string;
};

export const ViewOnExplorer = ({ subject, value, classNames }: Props) => {
  const { chain } = useNetwork();

  let link: string;

  switch (chain?.name) {
    case 'Hardhat':
      link = `https://etherscan.io/${subject}/${value}`;
      break;
    case 'Mainnet':
      link = `https://etherscan.io/${subject}/${value}`;
      break;
    default:
      link = `https://etherscan.io/${subject}/${value}`;
      break;
  }

  return (
      <Link
        href={link}
        icon={true}
      >
        View {subject === 'tx' ? 'transaction' : subject} on Explorer
      </Link>
  
    // <a
    //   tabIndex={-1}
    //   className={classNames}
    //   href={link}
    //   target="_blank"
    //   rel="noreferrer"
    // >
    //   <Link
    //     icon={true}
    //     className="mr-1 font-medium text-neutral-700"
    //   >
    //     View {subject === 'tx' ? 'transaction' : subject} on Explorer
    //   </Link>
    // </a>
  );
};
