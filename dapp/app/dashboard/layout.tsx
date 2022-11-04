import Navigation from '@/components/Navigation';
import { ReactNode } from 'react';
import { ProtectPageGuard } from './ProtectPageGuard';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <ProtectPageGuard>
      <Navigation />
      <main className="max-w-6xl p-2 mx-auto mt-12 lg:p-8 lg:mt-32">
        {children}
      </main>
    </ProtectPageGuard>
  );
}
