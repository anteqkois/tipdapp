import React from 'react';

const PaginationButton = ({ onClick, children, active }) => {
  // console.log(active);
  return (
    <button
      className={`px-4 py-2 border-y-2 border-r-2 bg-neutral-100 hover:bg-neutral-200  border-neutral-300 first-of-type:border-l-2 first-of-type:rounded-tl-lg first-of-type:rounded-bl-lg last-of-type:rounded-tr-lg last-of-type:rounded-br-lg ${
        // active && 'bg-neutral-300 ring-2 ring-neutral-300 z-30'
        // active && 'bg-neutral-300 outline outline-2 outline-neutral-300 z-30'
        active && 'bg-neutral-300 outline outline-2 outline-neutral-300 z-30'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
