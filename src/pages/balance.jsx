import TokenBalance from '@/components/Token/TokenBalance';
import Card from '@/components/utils/Card';
import useUser from '@/hooks/useUser';
import { requireAuthPage } from '@/utils/requireAuthPage';
import { chain } from 'wagmi';

const balance = ({}) => {
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

export default balance;

export const getServerSideProps = requireAuthPage((ctx) => {
  return {
    props: { user: ctx.req.user },
  };
});