'use client';
import { PublicNav } from '@/modules/Navigation/containers/Public';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <PublicNav />
      {/* <main className="max-w-6xl p-2 mx-auto mt-12 lg:p-8 lg:mt-32"> */}
      {children}
      {/* </main> */}
    </>
  );
}
