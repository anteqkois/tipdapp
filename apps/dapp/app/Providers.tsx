'use client';

import { ReduxProvider } from '@/lib/redux/ReduxProvider';
import { WagmiProvider } from '@/lib/Web3Provider';
import { ModalProvider } from '@/shared/hooks';
import { UserProvider } from '@/shared/User/hooks/useUser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
});

type Props = {
  children: ReactNode;
};

export const Providers = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    <WagmiProvider>
      {/* TODO move signUpForm slice to react context */}
      <ReduxProvider>
        <UserProvider>
          {/* <RainbowKitProviders> */}
          <ModalProvider />
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          {children}
          {/* </RainbowKitProviders> */}
        </UserProvider>
      </ReduxProvider>
    </WagmiProvider>
  </QueryClientProvider>
);
