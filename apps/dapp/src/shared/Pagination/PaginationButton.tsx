import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export const PaginationButton = ({ children, active, ...props }: Props) => (
  <button
    {...props}
    type="button"
    className={classNames(
      'h-9 w-8 lg:h-11 lg:w-10',
      'relative border-y-2 border-r-2 border-neutral-300 bg-neutral-50  hover:bg-neutral-200 ',
      'first-of-type:w-fit first-of-type:rounded-tl first-of-type:rounded-bl first-of-type:border-l-2 first-of-type:px-3',
      'last-of-type:w-fit last-of-type:rounded-tr last-of-type:rounded-br last-of-type:px-3',
      [
        active &&
          'z-20 before:absolute before:inset-y-[-5px] before:inset-x-[-3px] before:border-[5px] before:border-neutral-300 before:bg-neutral-300/70',
      ]
    )}
  >
    <p className="relative z-30">{children}</p>
  </button>
);
