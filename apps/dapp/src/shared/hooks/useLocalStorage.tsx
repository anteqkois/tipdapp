import { Dispatch, SetStateAction, useState } from 'react';

function useLocalStorage<S>(
  key: string,
  initialState: S | (() => S)
  // initialState?: S | (() => S)
): [S, Dispatch<SetStateAction<S>>, (keyToRemove?: string) => void];

function useLocalStorage<S = undefined>(
  key: string
): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>,
  (keyToRemove?: string) => void
];

function useLocalStorage<S = undefined>(
  key: string,
  initialValue?: S | (() => S)
) {
  const [storedValue, setStoredValue] = useState<S>(() => {
    try {
      const item = window.localStorage.getItem(key);
      const valueToStore =
        initialValue instanceof Function ? initialValue() : initialValue;
      return item ? JSON.parse(item) : valueToStore;
    } catch (error) {
      return initialValue instanceof Function ? initialValue() : initialValue;
    }
  });

  const setValue = (value: S | ((val: S) => S)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = (keyToRemove: string) =>
    localStorage.removeItem(keyToRemove ?? key);

  return [storedValue, setValue, removeItem] as const;
}
export { useLocalStorage };
