import { StreamerNav } from '@/components/Navigation/User/Streamer';
import { ProtectPageGuard } from '@/components/utils';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <ProtectPageGuard allowedRoles={['streamer']}>
      <StreamerNav />
      {/* <main className="max-w-6xl p-2 mx-auto mt-12 lg:p-8 lg:mt-32"> */}
      <main>{children}</main>
    </ProtectPageGuard>
  );
}
