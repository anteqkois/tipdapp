import { RainbowKitProviders } from '@/lib/Web3Provider';
import { StreamerNav } from '@/modules/Navigation/containers';
import { MainContainer } from '@/shared/ui';
import { ProtectPageRoleBased } from '@/shared/User/ProtectPageRoleBased';
import { ReactNode } from 'react';
// import { StreamerNav } from 'src/modules/Navigation/User/Streamer';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <RainbowKitProviders>
      <ProtectPageRoleBased allowedRoles={['streamer']}>
        <StreamerNav />
        <MainContainer>{children}</MainContainer>
      </ProtectPageRoleBased>
    </RainbowKitProviders>
  );
}
