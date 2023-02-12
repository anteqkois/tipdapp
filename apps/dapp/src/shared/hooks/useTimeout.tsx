import { useCallback, useEffect, useRef } from 'react';

export function useTimeout(callback: () => void, delay: number) {
  const callbackRef = useRef<() => void>(callback);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const setT = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clearT = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    setT();
    return clearT;
  }, [delay, setT, clearT]);

  const reset = useCallback(() => {
    clearT();
    setT();
  }, [clearT, setT]);

  return { reset, clear: clearT };
}
