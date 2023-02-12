import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

export const Card = ({ children, className }: Props) => (
  <div
    className={`rounded bg-neutral-50 p-4 shadow-md ring-1 ring-neutral-600 ring-opacity-10 ${className}`}
  >
    {children}
  </div>
);
