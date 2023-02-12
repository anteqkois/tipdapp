import { useCallback, useEffect, useRef, useState } from 'react';

type PreOption = 'max-width' | 'min-width';
type BreakPoints = '640' | '768' | '1024' | '1280' | '1536';

type QueriesOption = `(${PreOption}: ${BreakPoints}px)`;

const useMediaQuery = <T,>(
  queries: QueriesOption[],
  values: T[],
  defaultValue: T
): T => {
  const mediaQueryLists = useRef<MediaQueryList[]>();

  const getValue = useCallback(() => {
    const index = mediaQueryLists.current?.findIndex(
      (mediaQuery) => mediaQuery.matches
    );

    return typeof values[index as number] !== 'undefined'
      ? values?.[index as number]
      : defaultValue;
  }, [defaultValue, values]);

  const [value, setValue] = useState<T>(getValue);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      mediaQueryLists.current = queries.map((query) =>
        window.matchMedia(query)
      );
      setValue(getValue);
    }
  }, [getValue, queries]);

  useEffect(() => {
    const handler = () => setValue(getValue);
    mediaQueryLists.current?.forEach((mql) => mql.addListener(handler));
    return () =>
      mediaQueryLists.current?.forEach((mql) => mql.removeListener(handler));
  }, [getValue]);

  return value;
};

export { useMediaQuery };
