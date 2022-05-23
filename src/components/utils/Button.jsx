import React from 'react';

const Button = ({ children, onClick, className, type, ...props }) => {
  return (
    <button
      {...props}
      className={(() => {
        let result = `${className} rounded-lg uppercase font-semibold `;
        switch (type) {
          case 'ghost':
            result += `mx-1 px-4 py-1.5 outline outline-neutral-800 outline-3 text-neutral-900 hover:bg-neutral-100`;
            break;
          case 'special':
            result += `px-4 py-3 bg-gradient-to-r from-pink-800 via-fuchsia-800 to-violet-800 hover:bg-purple-700 hover:from-pink-900 hover:via-fuchsia-900 hover:to-violet-900`;
            break;
          case 'minimalist':
            result += `block text-neutral-900 underline decoration-2 decoration-primary-500 lowercase`;
            break;
          default:
            result += `px-4 py-3 text-primary-100 bg-gradient-to-r from-primary-900/80 via-primary-800/90 to-primary-800/95 hover:text-primary-200 hover:from-primary-900 hover:via-primary-800 hover:to-primary-800`;
            break;
        }
        return result;
      })()}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
