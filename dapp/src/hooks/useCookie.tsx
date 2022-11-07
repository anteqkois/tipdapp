import { useEffect, useState } from 'react';

interface Options {
  expireDays?: number;
  // expireHours: number;
  path?: string;
}

export const useCookie = <S,>(
  key: string,
  initialValue?: S,
  options?: Options
) => {
  const [storedValue, setStoredValue] = useState<S | undefined>(() => {
    try {
      return getCookie(key) ?? initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    initialValue && setCookie(key, initialValue);
  }, []);

  const getCookie = (key: string): S | null => {
    return (
      (document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === key ? decodeURIComponent(parts[1]) : r;
      }, '') as S) || null
    );
  };

  const setCookie = (key: string, value: S, options?: Options) => {
    const optionsWithDefaults = {
      expireDays: 1,
      expireHours: 0,
      path: '/',
      ...options,
    };

    const expires = new Date(
      Date.now() + optionsWithDefaults.expireDays * 864e5
    ).toUTCString();

    const cookie = (window.document.cookie = `${key}=${JSON.stringify(
      value
    )}; expires=${expires}`);

    document.cookie = cookie;
  };

  const updateCookie = (value: S, options?: Options) => {
    setStoredValue(value);
    setCookie(key, value, options);
  };

  return [storedValue, updateCookie] as const;
};

export default useCookie;
