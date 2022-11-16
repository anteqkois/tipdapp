import { ReactNode } from "react";

type Props = {
  message?: string;
  children: ReactNode
};
export const InfoMessage = ({ message, children }: Props) => {
  return <h6 className="text-secondary text-center">{children}</h6>;
};
