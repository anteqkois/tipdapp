'use client';

import TokenBalance from '@/modules/Token/containers/TokenBalance';
import { Card } from '@/shared/ui';
import { useUser } from '@/shared/User/hooks/useUser';
import { hardhat, mainnet, polygon } from 'wagmi/chains';

function Balance() {
  const { user } = useUser();

  return (
    <Card>
      <TokenBalance
        address={user!.address}
        chainId={hardhat.id}
      />
      <TokenBalance
        address={user!.address}
        chainId={polygon.id}
      />
      <TokenBalance
        address={user!.address}
        chainId={mainnet.id}
      />
    </Card>
  );
}

export default Balance;
