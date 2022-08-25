import { forwardRef } from 'react';

const Button = forwardRef(({ children, className, option, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={(() => {
        let result = `${className} rounded-lg font-semibold state-focus `;
        switch (option) {
          case 'overlay':
            result += `px-3.5 py-1.5 bg-neutral-100 text-neutral-800 shadow-md hover:bg-neutral-150`;
            break;
          case 'ghost':
            result += `px-3.5 py-1.5 border-2 border-neutral-300 outline-2 text-neutral-800 hover:bg-neutral-150`;
            break;
          case 'special':
            result += `px-4 py-2 text-neutral-50 bg-gradient-to-tr from-primary-600  via-primary-600 to-secondary-700 hover:from-primary-700 hover:via-primary-700 hover:to-secondary-800 transition-all duration-1000 ease-in-out`;
            break;
          case 'minimalist':
            result += `block text-neutral-900 underline decoration-2 decoration-primary-600`;
            break;
          case 'success':
            result += `px-4 py-2 text-primary-50 bg-gradient-to-tr from-success-600 via-success-600 to-success-700 hover:text-success-200 hover:from-success-700 hover:via-success-700 hover:to-success-800`;
            break;
          case 'alert':
            result += `px-4 py-2 text-primary-50 bg-gradient-to-tr from-alert-600 via-alert-600 to-alert-700 hover:text-alert-200 hover:from-alert-700 hover:via-alert-700 hover:to-alert-800`;
            break;
          default:
            result += `px-4 py-2 text-primary-50 bg-gradient-to-tr from-primary-600/80 via-primary-600/90 to-primary-600/95 hover:text-primary-200 hover:from-primary-600 hover:via-primary-600 hover:to-primary-600`;
            break;
        }
        return result;
      })()}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
