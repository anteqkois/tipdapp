import { ReactNode } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

type Props = {
  children: ReactNode;
};

export const SuspenseBoundary = ({ children }: Props) => {
  return <ErrorBoundary ></ErrorBoundary>;
};

