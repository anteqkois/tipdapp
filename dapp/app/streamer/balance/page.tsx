'use client';

import TokenBalance from '@/modules/Token/containers/TokenBalance';
import { Card } from '@/shared/ui';
import { useUser } from '@/shared/User/hooks/useUser';
import { chain } from 'wagmi';

const Balance = () => {
  const { user } = useUser();

  return (
    <Card>
      <TokenBalance
        address={user!.address}
        chainId={chain.mainnet.id}
      />
      <TokenBalance
        address={user!.address}
        chainId={chain.polygon.id}
      />
      <TokenBalance
        address={user!.address}
        chainId={chain.optimism.id}
      />
      <TokenBalance
        address={user!.address}
        chainId={chain.hardhat.id}
      />
    </Card>
  );
};

export default Balance;
