import { Dispatch, SetStateAction, useState } from 'react';

type Options = {
  expireDays?: number;
  secure?: boolean;
  samesite?: boolean | 'lax' | 'strict' | 'none';
  path?: string;
};

export function stringifyOptions(options: Options) {
  return (Object.keys(options) as Array<keyof typeof options>).reduce(
    (acc, key) => {
      switch (key) {
        case 'expireDays':
          return acc;
        default:
          if (options[key] === true) {
            return `${acc} ${key};`;
          } else {
            return `${acc} ${key}=${options[key]};`;
          }
      }
    },
    ';'
  );
}

const getCookie = <S,>(key: string): S | undefined => {
  return (
    (document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === key ? decodeURIComponent(parts[1]) : r;
    }, '') as S) || undefined
  );
};

//TODO add remove cookie function
const setCookie = <S,>(key: string, value: S, options?: Options) => {
  try {
    const optionsWithDefaults = {
      expireDays: 1,
      path: '/',
      ...options,
    };

    console.log(optionsWithDefaults);

    const expires = new Date(
      Date.now() + optionsWithDefaults.expireDays * 864e5
    ).toUTCString();

    //from exxpressJS, to be set in teh same way
    const val =
      typeof value === 'object'
        ? String('j:' + JSON.stringify(value))
        : String(value);

    const cookie = (window.document.cookie = `${key}=${encodeURIComponent(
      val
    )}; expires=${expires} ${stringifyOptions(optionsWithDefaults)}`);

    console.log(cookie);

    document.cookie = cookie;
  } catch (error) {
    console.log(error);
  }
};

export function useCookie<S>(
  key: string,
  initialValue: S | (() => S),
  options?: Options
): [S, Dispatch<SetStateAction<S>>];

export function useCookie<S = undefined>(
  key: string
): [S | undefined, (value: S, options?: Options) => void];

export function useCookie<S>(key: string, initialValue?: S, options?: Options) {
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

  //if need to render HMTL, with present soluytions throws error that not match HTML(maybe try useLayoutEffect ?)
  // useEffect(() => {
  //   const cookie = getCookie<S>(key);
  //   setStoredValue(cookie ?? initialValue);
  //   initialValue && setCookie(key, initialValue);
  // }, []);

  const updateCookie = (value: S, options?: Options) => {
    setStoredValue(value);
    setCookie(key, value, options);
  };

  return [storedValue, updateCookie] as const;
}

export default useCookie;
