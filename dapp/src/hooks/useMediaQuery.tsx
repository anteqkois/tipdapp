import { useEffect, useRef, useState } from 'react';

type PreOption = 'max-width' | 'min-width';
type BreakPoints = '640' | '768' | '1024' | '1280' | '1536';

type QueriesOption = `(${PreOption}: ${BreakPoints}px)`;

export const useMediaQuery = <T,>(
  queries: QueriesOption[],
  values: T[],
  defaultValue: T
): T => {
  const mediaQueryLists = useRef<MediaQueryList[]>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      mediaQueryLists.current = queries.map((query) =>
        window.matchMedia(query)
      );
      setValue(getValue);
    }
  }, []);

  const getValue = () => {
    const index = mediaQueryLists.current?.findIndex(
      (mediaQuery) => mediaQuery.matches
    );

    return typeof values[index as number] !== 'undefined'
      ? values?.[index as number]
      : defaultValue;
  };

  const [value, setValue] = useState<T>(getValue);

  useEffect(() => {
    const handler = () => setValue(getValue);
    mediaQueryLists.current?.forEach((mql) => mql.addListener(handler));
    return () =>
      mediaQueryLists.current?.forEach((mql) => mql.removeListener(handler));
  }, []);

  return value;
};

export default useMediaQuery;
