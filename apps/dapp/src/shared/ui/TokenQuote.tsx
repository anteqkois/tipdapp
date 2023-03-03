import { HTMLAttributes } from 'react';

type Props = {} & HTMLAttributes<HTMLSpanElement>;

export const TokenQuote = ({ className, children }: Props) => (
  <span className={`${className} font-semibold text-primary-900`}>
    ${children}
  </span>
);
