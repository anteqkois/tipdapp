import TokenBalance from '@/components/Token/TokenBalance';
import Card from '@/components/utils/Card';
import useUser from '@/hooks/useUser';
import { chain } from 'wagmi';

const Balance = ({}) => {
  const { user } = useUser();

  return (
    <Card>
      <TokenBalance walletAddress={user.walletAddress} chainId={chain.mainnet.id} tokenAddress />
      <TokenBalance walletAddress={user.walletAddress} chainId={chain.polygon.id} tokenAddress />
      <TokenBalance walletAddress={user.walletAddress} chainId={chain.optimism.id} tokenAddress />
      <TokenBalance walletAddress={user.walletAddress} chainId={chain.hardhat.id} tokenAddress />
    </Card>
  );
};

Balance.isProtected = true;

export default Balance;
