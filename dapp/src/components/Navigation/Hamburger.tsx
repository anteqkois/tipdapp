import { Dispatch, MouseEvent, SetStateAction } from 'react';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Hamburger = ({ isOpen, setIsOpen }: Props) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <button
      className="flex justify-around flex-wrap flex-col p-1.5 h-10 w-11 "
      onClick={handleClick}
    >
      <span
        className={`bg-neutral-800 w-full h-[3px] rounded ease-in-out duration-500 origin-top ${
          isOpen ? 'translate-y-3 rotate-45' : 'rotate-0'
        }`}
      />
      <span
        className={`bg-neutral-800 w-full h-[3px] rounded ease-in-out duration-500 ${
          isOpen ? 'scale-0' : 'scale-1'
        }`}
      />
      <span
        className={`bg-neutral-800 w-full h-[3px] rounded ease-in-out duration-500 origin-bottom ${
          isOpen ? '-translate-y-2 -rotate-45' : 'rotate-0'
        }`}
      />
    </button>
  );
};

export default Hamburger;
