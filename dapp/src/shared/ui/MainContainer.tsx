import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};
export const MainContainer = ({ children, className }: Props) => {
  return (
    <main
      className={`p-2 mx-auto pt-14 text-neutral-800 max-w-6xl lg:p-8 lg:pt-32 ${className}`}
    >
      {children}
    </main>
  );
};
