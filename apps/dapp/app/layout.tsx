'use client';

import { ReactNode } from 'react';
import './globals.css';
import { Providers } from './Providers';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <title>CryptoTip</title>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
