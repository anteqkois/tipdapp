'use client';
import { ModalProvider, UserProvider } from '@/hooks';
import ReduxProvider from '@/lib/redux/ReduxProvider';
import { RainbowKitProviders, WagmiProvider } from '@/lib/Web3Provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
});

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        /> */}
        <title>CryptoTip</title>
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider>
            {/* TODO move signUpForm slice to react context */}
            <ReduxProvider>
              <UserProvider>
                <RainbowKitProviders>
                  <ModalProvider />
                  <Toaster
                    position="top-center"
                    reverseOrder={false}
                  />
                  {/* <main className="max-w-6xl p-2 mx-auto mt-12 lg:p-8 lg:mt-32"> */}
                  {children}
                  {/* <main>{children}</main> */}
                </RainbowKitProviders>
              </UserProvider>
            </ReduxProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
