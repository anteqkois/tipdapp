import { ReactNode } from 'react';
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';

type StateUIProps = {
  loading: boolean;
  empty?: boolean;
  error?: string;
  LoadingComponent?: JSX.Element;
  EmptyComponent?: JSX.Element;
  children: ReactNode;
};
// TODO add error/fail state
export const StateUI = ({
  loading,
  empty = false,
  error = '',
  LoadingComponent = <Spinner />,
  EmptyComponent = <Spinner />,
  children,
}: StateUIProps): JSX.Element => {
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (loading) return LoadingComponent;
  if (empty) return EmptyComponent;
  return <>children</>;
  // return <>{loading ? LoadingComponent : empty ? EmptyComponent : children}</>;
};
