'use client';
import { ModalProvider, UserProvider } from '@/hooks';
import ReduxProvider from '@/lib/redux/ReduxProvider';
import { RainbowKitProviders, WagmiProvider } from '@/lib/Web3Provider';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import './globals.css';

const queryClient = new QueryClient();

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
                {children}
              </RainbowKitProviders>
            </UserProvider>
          </ReduxProvider>
                  </WagmiProvider>
                  </QueryClientProvider>
      </body>
    </html>
  );
}