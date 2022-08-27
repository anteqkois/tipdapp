import React from 'react';

function Card({ children, className }) {
  return (
    <div className={`p-4 bg-neutral-50 rounded shadow-md ring-1 ring-neutral-600 ring-opacity-10 ${className}`}>{children}</div>
  );
}

export default Card;
