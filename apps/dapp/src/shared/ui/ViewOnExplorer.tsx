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

  // TODO use data from chains from wagmi ?
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
        icon
      >
        View {subject === 'tx' ? 'transaction' : subject} on Explorer
      </Link>
  );
};
