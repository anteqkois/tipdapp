import { RainbowKitProviders } from '@/lib/Web3Provider';
import { MainContainer } from '@/shared/ui';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <RainbowKitProviders>

    <MainContainer>
      {children}
    </MainContainer>
    </RainbowKitProviders>
  );
}
