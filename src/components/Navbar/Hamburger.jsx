import React, { useRef } from 'react';

const Hamburger = ({ setIsOpen, isOpen }) => {
  const hamburger = useRef(null);

  const handleClick = () => {
    hamburger.current.blur();
    setIsOpen((isOpen) => !isOpen);
  };
  return (
    <button className="flex justify-around flex-wrap flex-col p-1.5 h-10 w-11 " ref={hamburger} onClick={handleClick}>
      <span
        className={`bg-stone-800 w-full h-[3px] rounded ease-in-out duration-500 origin-top ${
          isOpen ? 'translate-y-3 rotate-45' : 'rotate-0'
        }`}
      />
      <span className={`bg-stone-800 w-full h-[3px] rounded ease-in-out duration-500 ${isOpen ? 'scale-0' : 'scale-1'}`} />
      <span
        className={`bg-stone-800 w-full h-[3px] rounded ease-in-out duration-500 origin-bottom ${
          isOpen ? '-translate-y-2 -rotate-45' : 'rotate-0'
        }`}
      />
    </button>
  );
};

export default Hamburger;
