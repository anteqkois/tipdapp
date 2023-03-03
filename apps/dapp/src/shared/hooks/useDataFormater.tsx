import { useEffect, useRef } from 'react';

export function useDataFormater() {
  const locales = useRef<string>();
  const formatter = useRef<Intl.DateTimeFormat>();

  useEffect(() => {
    locales.current = navigator.language;
    formatter.current = new Intl.DateTimeFormat(locales.current, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }, []);

  const formatDateBasic = (date?: number | Date | undefined) =>
    formatter.current?.format(date);

  return { formatDateBasic };
}
