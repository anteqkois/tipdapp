import { chain } from 'wagmi';
import TokenBalance from '@/components/Token/TokenBalance';
import Card from '@/components/utils/Card';
import useUser from '@/hooks/useUser';
import { requireAuthPage } from 'utils/requireAuthPage';

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

{
  /* │ Run the following to update │ │ npm i --save-dev prisma@latest │ │ npm i @prisma/client@latest */
}
export default balance;

export const getServerSideProps = requireAuthPage((ctx) => {
  return {
    props: { user: ctx.req.user },
  };
});
