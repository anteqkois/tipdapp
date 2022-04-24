import { useState, useEffect } from 'react';

function useMedia(queries, values, defaultValue) {
  let mediaQueryLists;
  if (typeof window !== 'undefined') {
    mediaQueryLists = queries.map((q) => window.matchMedia(q));
  } else {
    mediaQueryLists = [];
  }

  const getValue = () => {
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
  };

  const [value, setValue] = useState(getValue);
  useEffect(() => {
    const handler = () => setValue(getValue);
    mediaQueryLists.forEach((mql) => mql.addListener(handler));
    return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler));
  }, []);
  return value;
}

export default useMedia;
