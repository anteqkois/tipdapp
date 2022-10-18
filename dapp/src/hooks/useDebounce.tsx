import { useEffect } from 'react';
import useTimeout from './useTimeout';

export function useDebounce<D extends []>(
  callback: () => void,
  delay: number,
  dependencies: D
) {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
}

export default useDebounce;
