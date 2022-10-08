import TokenBalance from '@/components/Token/TokenBalance';
import Card from '@/components/utils/Card';
import useUser from '@/hooks/useUser';
import { chain } from 'wagmi';

const Balance = ({}) => {
  const { user } = useUser();

  return (
    <Card>
      <TokenBalance address={user.address} chainId={chain.mainnet.id} tokenAddress />
      <TokenBalance address={user.address} chainId={chain.polygon.id} tokenAddress />
      <TokenBalance address={user.address} chainId={chain.optimism.id} tokenAddress />
      <TokenBalance address={user.address} chainId={chain.hardhat.id} tokenAddress />
    </Card>
  );
};

Balance.isProtected = true;

export default Balance;
