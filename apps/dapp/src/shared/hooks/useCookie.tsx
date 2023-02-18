'use client';

import { Dispatch, SetStateAction, useState } from 'react';

type Options = {
  expireDays?: number;
  secure?: boolean;
  samesite?: boolean | 'lax' | 'strict' | 'none';
  path?: string;
};

const stringifyOptions = (options: Options) =>
  (Object.keys(options) as Array<keyof typeof options>).reduce((acc, key) => {
    switch (key) {
      case 'expireDays':
        return acc;
      default:
        if (options[key] === true) {
          return `${acc} ${key};`;
        }
        return `${acc} ${key}=${options[key]};`;
    }
  }, ';');

const getCookie = <S,>(key: string): S | undefined =>
  typeof window !== 'undefined'
    ? (document?.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === key ? decodeURIComponent(parts[1]) : r;
      }, '') as S) || undefined
    : undefined;

// TODO add remove cookie function
const setCookie = <S,>(key: string, value: S, options?: Options) => {
  try {
    const optionsWithDefaults = {
      expireDays: 1,
      path: '/',
      ...options,
    };

    const expires = new Date(
      Date.now() + optionsWithDefaults.expireDays * 864e5
    ).toUTCString();

    // from exxpressJS, to be set in teh same way
    const val =
      typeof value === 'object'
        ? String(`j:${JSON.stringify(value)}`)
        : String(value);

    const cookie = `${key}=${encodeURIComponent(
      val
    )}; expires=${expires} ${stringifyOptions(optionsWithDefaults)}`;

    if (typeof window !== 'undefined') {
      window.document.cookie = cookie;
    }
  } catch (error) {
    console.log(error);
  }
};

function useCookie<S>(
  key: string,
  initialValue: S | (() => S),
  options?: Options
): [S, Dispatch<SetStateAction<S>>];

function useCookie<S = undefined>(
  key: string
): [S | undefined, (value: S, options?: Options) => void];

function useCookie<S>(key: string, initialValue?: S, options?: Options) {
  const [storedValue, setStoredValue] = useState<S | undefined>(() => {
    try {
      // console.log('coookie', getCookie(key));
      const cookie = getCookie<S>(key);
      !cookie && initialValue && setCookie(key, initialValue, options);
      return cookie ?? initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // if need to render HMTL, with present soluytions throws error that not match HTML(maybe try useLayoutEffect ?)
  // useEffect(() => {
  //   const cookie = getCookie<S>(key);
  //   setStoredValue(cookie ?? initialValue);
  //   initialValue && setCookie(key, initialValue);
  // }, []);

  const updateCookie = (value: S, newOptions?: Options) => {
    setStoredValue(value);
    setCookie(key, value, newOptions);
  };

  return [storedValue, updateCookie] as const;
}

export { stringifyOptions, useCookie };
