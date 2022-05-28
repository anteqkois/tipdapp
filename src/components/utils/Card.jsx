import React from 'react';

function Card({ children, className }) {
  return <div className={`p-4 bg-neutral-50 rounded-lg shadow-md ${className}`}>{children}</div>;
}

export default Card;
