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
    <ProtectPageRoleBased allowedRoles={['streamer']}>
      <StreamerNav />
      {/* <main className="max-w-6xl p-2 mx-auto mt-12 lg:p-8 lg:mt-32"> */}
      <MainContainer>{children}</MainContainer>
    </ProtectPageRoleBased>
  );
}
