import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> &{header:string};

export const InfoParagraph = ({children, header}:Props) => {
  return (
    <p className="flex items-center gap-1">
      <span className="font-medium ">{header} </span>
      {children}
    </p>
  );
}