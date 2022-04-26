// import { useState, useEffect, useLayoutEffect } from 'react';

// function useMedia(queries, values, defaultValue) {
//   let mediaQueryLists = [];

//   useLayoutEffect(() => {
//     if (typeof window !== 'undefined') {
//       mediaQueryLists = queries.map((q) => window.matchMedia(q));
//     } else {
//       mediaQueryLists = [];
//     }
//   }, []);

//   const getValue = () => {
//     const index = mediaQueryLists.findIndex((mql) => mql.matches);
//     return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
//   };

//   const [value, setValue] = useState(getValue);
//   useLayoutEffect(() => {
//     const handler = () => setValue(getValue);
//     mediaQueryLists.forEach((mql) => mql.addListener(handler));
//     return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler));
//   }, []);
//   return value;
// }

// export default useMedia;

import { useEffect, useState } from 'react';

function useMediaQuery(query, defaultMatches) {
  const [matches, setMatches] = useState(defaultMatches);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) setMatches(media.matches);

    const listener = () => setMatches(media.matches);

    media.addListener(listener);

    return () => media.removeListener(listener);
  }, [query, matches]);

  return matches;
}

export default useMediaQuery;
