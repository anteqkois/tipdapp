'use client';
import { PublicNav } from '@/modules/Navigation/containers';
import { ReactNode } from 'react';
type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <PublicNav />
      {children}
    </>
  );
}
