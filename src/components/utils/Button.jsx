import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { forwardRef } from 'react';

export const Button = forwardRef(({ children, className, option, ...props }, ref) => {
  return (
    <button
      {...props}
      // onKeyDown={(key) => key.code === 'Enter' && props.onClick()}
      // tabIndex='0'
      ref={ref}
      className={(() => {
        let result = `${className} rounded select-none text-sm font-medium state-focus `;
        switch (option) {
          case 'link':
            result += `flex items-center gap-1 underline decoration-1.5 decoration-primary-light`;
            break;
          case 'overlay':
            result += `px-3.5 py-1.5 bg-neutral-100 text-neutral-800 shadow-md hover:bg-neutral-150`;
            break;
          case 'ghost':
            result += `px-3.5 py-1.5 border-2 border-neutral-300 outline-2 text-neutral-800 hover:bg-neutral-150`;
            break;
          case 'special':
            result += `px-4 py-2 text-neutral-50 bg-gradient-to-tr from-primary  to-secondary-700 hover:from-primary-dark hover:to-secondary-800 `;
            break;
          case 'minimalist':
            result += `block text-neutral-900 underline decoration-2 decoration-primary`;
            break;
          case 'success':
            result += `px-4 py-2 text-primary-50 bg-gradient-to-tr from-success-600 via-secondary-600 to-secondary-700 hover:text-secondary-200 hover:from-secondary-700 hover:via-secondary-700 hover:to-secondary-800`;
            break;
          // case 'success':
          //   result += `px-4 py-2 text-primary-50 bg-gradient-to-tr from-success-600 via-success-600 to-success-700 hover:text-success-200 hover:from-success-700 hover:via-success-700 hover:to-success-800`;
          //   break;
          case 'alert':
            result += `px-4 py-2 text-primary-50 bg-gradient-to-tr from-alert-400 via-alert-500 to-alert-500 hover:text-alert-200 hover:from-alert-500 hover:via-alert-600 hover:to-alert-600`;
            break;
          default:
            result += `px-4 py-2 text-primary-50 bg-gradient-to-tr from-primary/80 via-primary/90 to-primary/95 hover:text-primary-200 hover:from-primary hover:via-primary hover:to-primary`;
            break;
        }
        return result;
      })()}
    >
      {children}
      {option === 'link' && <ArrowTopRightOnSquareIcon className="w-5" />}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
