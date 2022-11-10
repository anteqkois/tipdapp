'use client';

import { useCookie } from '@/hooks';

export default function Page() {
  const [value, setValue] = useCookie<any>('test2', 'teest');
  console.log(value);

  return (
    <>
      <button
        onClick={() => {
          setValue('testowa wartosc');
        }}
      >
        set cookie
      </button>
    </>
  );
}
