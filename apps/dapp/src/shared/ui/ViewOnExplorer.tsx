import { Address, Hash } from '@wagmi/core';
import { AnchorHTMLAttributes } from 'react';
import { useNetwork } from 'wagmi';
import { Link } from './Link';

type Props = {
  subject: 'token' | 'tx' | 'address';
  value: Address | Hash | string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const ViewOnExplorer = ({ subject, value, ...rest }: Props) => {
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
      {...rest}
      href={link}
      icon
    >
      View {subject === 'tx' ? 'transaction' : subject} on Explorer
    </Link>
  );
};
