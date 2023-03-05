import classnames from 'classnames';
import { ButtonHTMLAttributes, forwardRef, ReactElement } from 'react';

type ButtonVariant =
  | 'default'
  | 'success'
  | 'danger'
  | 'info'
  | 'clear'
  | 'overlay'
  | 'ghost'
  | 'special'
  | 'minimalist';

type ButtonProps = {
  variant?: ButtonVariant;
  icon?: ReactElement;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      icon,
      variant = 'default',
      type = 'button',
      ...props
    },
    ref
  ) => (
    <button
      {...props}
      // onKeyDown={(key) => key.code === 'Enter' && props.onClick()}
      // tabIndex='0'
      // eslint-disable-next-line react/button-has-type
      type={type}
      ref={ref}
      className={classnames(
        className,
        'state-focus inline-flex select-none items-center justify-center gap-1 rounded text-sm font-medium disabled:from-neutral-400 disabled:via-neutral-400 disabled:to-neutral-400 disabled:text-neutral-50 disabled:hover:cursor-not-allowed disabled:hover:text-neutral-50',
        // ' state-focus select-none rounded text-sm font-medium disabled:from-neutral-400 disabled:via-neutral-400 disabled:to-neutral-400 disabled:text-neutral-50 disabled:hover:cursor-not-allowed disabled:hover:text-neutral-50',
        {
          'px-4 py-2': [
            'default',
            'success',
            'danger',
            'special',
            'overlay',
          ].includes(variant),
          'px-3.5 py-1.5': ['ghost'].includes(variant),
        },
        {
          default:
            'bg-gradient-to-tr from-primary/80 via-primary/90 to-primary/95 text-primary-50 hover:from-primary hover:via-primary hover:to-primary hover:text-primary-200',
          success:
            'bg-gradient-to-tr from-secondary-500 via-secondary-600 to-secondary-700 text-primary-50 hover:from-secondary-700 hover:via-secondary-700 hover:to-secondary-800 hover:text-secondary-200',
          danger:
            'bg-gradient-to-tr from-danger-400 via-danger-500 to-danger-500 text-primary-50 hover:from-danger-500 hover:via-danger-600 hover:to-danger-600 hover:text-danger-200',
          info: '',
          clear: 'text-neutral-500 hover:text-neutral-900',
          overlay:
            'bg-neutral-50 text-neutral-800 shadow-md hover:bg-neutral-200',
          ghost:
            'border-2 border-neutral-200 text-neutral-800 outline-2 hover:bg-neutral-150',
          link: 'decoration-1.5 flex items-center gap-1 underline decoration-primary-light',
          special:
            'bg-gradient-to-tr from-primary to-secondary-700  text-primary-50 hover:from-primary-dark hover:to-secondary-800',
          minimalist:
            'block text-neutral-900 underline decoration-primary decoration-2',
        }[variant]
      )}
    >
      {/* {icon && <span>{icon}</span>} */}
      {icon}
      {children}
    </button>
  )
);

Button.displayName = 'Button';
