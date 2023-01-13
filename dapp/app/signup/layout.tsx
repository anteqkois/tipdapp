import { MainContainer } from '@/shared/ui';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <MainContainer>
      {/* <main className="max-w-md m-2 p-3 px-2 border-2 rounded shadow-xl bg-neutral-50 shadow-neutral-200 md:w-full md:p-5 md:position-center"> */}
      {children}
      {/* </main> */}
    </MainContainer>
  );
}
