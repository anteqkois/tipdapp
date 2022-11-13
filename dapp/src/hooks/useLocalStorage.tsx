import { useState } from 'react';

export const useLocalStorage = <S,>(key: string, initialValue: S) => {
  const [storedValue, setStoredValue] = useState<S>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: S | ((val: S) => S)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        console.log('IN HOOK', JSON.stringify(valueToStore));
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
};

export default useLocalStorage;
