'use client';
import { RainbowKitProviders } from '@/lib/Web3Provider';
import { TipNav } from '@/modules/Navigation/containers';
import { TipperProvider } from '@/shared/User/hooks/useTipper';
import { ReactNode } from 'react';
type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <TipperProvider>
      <RainbowKitProviders>
        <TipNav />
        {children}
      </RainbowKitProviders>
    </TipperProvider>
  );
}
