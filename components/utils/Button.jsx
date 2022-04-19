import React from 'react';

const Button = ({ children, onClick, className, type, ...props }) => {
  return (
    <button
      {...props}
      className={(() => {
        let result = `${className} rounded-md uppercase font-semibold hover:text-slate-100 `;
        switch (type) {
          case 'ghost':
            result += `mx-1 px-4 py-1.5 outline outline-zinc-800 outline-4 hover:text-slate-100 hover:outline-zinc-700`;
            break;
          case 'special':
            result += `px-4 py-3 bg-gradient-to-r from-pink-800 via-fuchsia-800 to-violet-800 hover:bg-purple-700 hover:from-pink-900 hover:via-fuchsia-900 hover:to-violet-900`;
            break;
          case 'minimalist':
            result += `block text-fuchsia-100 underline decoration-2 decoration-fuchsia-500 lowercase`;
            break;
          default:
            result += `px-4 py-3 text-fuchsia-200 bg-gradient-to-r from-fuchsia-900/80 via-fuchsia-800/80 to-fuchsia-800/90 hover:text-fuchsia-300 hover:from-fuchsia-900/90 hover:via-fuchsia-800/90 hover:to-fuchsia-800`;
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
