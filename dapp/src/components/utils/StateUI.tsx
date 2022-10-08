import Spinner from "./Spinner";

type StateUIProps = {
  isLoading: Boolean,
  isEmpty: Boolean,
  LoadingComponent?: JSX.Element,
  EmptyComponent: JSX.Element,
  children: JSX.Element
}

export const StateUI = ({ isLoading, isEmpty, LoadingComponent = <Spinner />, EmptyComponent = <Spinner />, children }:StateUIProps) : JSX.Element=> {
  return <>{isLoading ? LoadingComponent : isEmpty ? EmptyComponent : children}</>;
};
