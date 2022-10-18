import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';

type StateUIProps = {
  loading: boolean;
  empty: boolean;
  error: string;
  LoadingComponent?: JSX.Element;
  EmptyComponent: JSX.Element;
  children: JSX.Element;
};
//TODO add error/fail state
export const StateUI = ({
  loading,
  empty,
  error,
  LoadingComponent = <Spinner />,
  EmptyComponent = <Spinner />,
  children,
}: StateUIProps): JSX.Element => {
  return (
    <>
      {loading ? (
        LoadingComponent
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : empty ? (
        EmptyComponent
      ) : (
        children
      )}
    </>
  );
  // return <>{loading ? LoadingComponent : empty ? EmptyComponent : children}</>;
};