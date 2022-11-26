'use client';

import TokenBalance from '@/components/Token/TokenBalance';
import { Card } from '@/components/utils';
import { useUser } from '@/hooks';
import { chain } from 'wagmi';

const Balance = () => {
  const { user } = useUser();

  return (
    <Card>
      <TokenBalance
        address={user.address}
        chainId={chain.mainnet.id}
      />
      <TokenBalance
        address={user.address}
        chainId={chain.polygon.id}
      />
      <TokenBalance
        address={user.address}
        chainId={chain.optimism.id}
      />
      <TokenBalance
        address={user.address}
        chainId={chain.hardhat.id}
      />
    </Card>
  );
};

export default Balance;
