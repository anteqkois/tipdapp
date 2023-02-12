'use client';

import { Dispatch, MouseEvent, SetStateAction } from 'react';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const Hamburger = ({ isOpen, setIsOpen }: Props) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    setIsOpen((prev) => !prev);
  };

  return (
    <button
      type="button"
      className="flex h-10 w-11 flex-col flex-wrap justify-around p-1.5 "
      onClick={handleClick}
    >
      <span
        className={`h-[3px] w-full origin-top rounded bg-neutral-800 duration-500 ease-in-out ${
          isOpen ? 'translate-y-3 rotate-45' : 'rotate-0'
        }`}
      />
      <span
        className={`h-[3px] w-full rounded bg-neutral-800 duration-500 ease-in-out ${
          isOpen ? 'scale-0' : 'scale-1'
        }`}
      />
      <span
        className={`h-[3px] w-full origin-bottom rounded bg-neutral-800 duration-500 ease-in-out ${
          isOpen ? '-translate-y-2 -rotate-45' : 'rotate-0'
        }`}
      />
    </button>
  );
};
