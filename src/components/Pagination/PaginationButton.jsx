import React from 'react';

const PaginationButton = ({ onClick, children, active }) => {
  return (
    <button
      className={`px-3 py-2 border-y-2 border-r-2 bg-neutral-50 hover:bg-neutral-200  border-neutral-300 first-of-type:border-l-2 first-of-type:rounded-tl first-of-type:rounded-bl first-of-type:px-3 last-of-type:rounded-tr last-of-type:rounded-br last-of-type:px-3 sm:px-4 sm:first-of-type:px-6 sm:last-of-type:px-6 ${
        active && ' py-2.5 border-x-2 outline outline-neutral-300 outline-2 bg-neutral-300/70 isolate z-30'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
