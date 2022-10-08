import Spinner from "./Spinner";

export const StateUI = ({ isLoading, isEmpty, LoadingComponent, EmptyComponent = <Spinner />, children }) => {
  return isLoading ? LoadingComponent : isEmpty ? EmptyComponent : children;
};
