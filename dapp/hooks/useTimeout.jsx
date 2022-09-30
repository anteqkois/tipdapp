import { useCallback, useEffect, useRef } from 'react';

export function useTimeout(callback, delay) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef();

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

export default useTimeout