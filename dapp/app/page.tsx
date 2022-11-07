'use client';

import { useCookie } from '@/hooks';

export default function Page() {
  const [value, setValue] = useCookie<string>('test');

  return (
    <>
      <button
        onClick={() => {
          setValue('testowa wartosc');
        }}
      >
        set cookie
      </button>
      <h1>{value}</h1>;
    </>
  );
}
