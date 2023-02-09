import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

export const MainContainer = ({ children, className }: Props) => {
  return (
    <main
      className={`mx-auto max-w-6xl p-2 pt-14 text-neutral-800 lg:p-8 lg:pt-32 ${className}`}
    >
      {children}
    </main>
  );
};
