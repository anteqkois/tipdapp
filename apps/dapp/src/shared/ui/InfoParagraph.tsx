import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLParagraphElement> & { header: string };

export const InfoParagraph = ({ children, header }: Props) => (
  <p className="flex items-start gap-1">
    <span className="font-medium ">{header}: </span>
    {children}
  </p>
);
