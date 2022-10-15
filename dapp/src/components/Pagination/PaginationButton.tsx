import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  // onClick: MouseEventHandler<HTMLButtonElement>;
  // children: ReactNode;
  active?: boolean;
};

const PaginationButton = ({ children, active, ...props }: Props) => {
  return (
    <button
      {...props}
      className={classNames(
        'h-9 w-8 lg:h-11 lg:w-10',
        'relative border-y-2 border-r-2 bg-neutral-50 hover:bg-neutral-200  border-neutral-300 ',
        'first-of-type:border-l-2 first-of-type:rounded-tl first-of-type:rounded-bl first-of-type:w-fit first-of-type:px-3',
        'last-of-type:rounded-tr last-of-type:rounded-br last-of-type:w-fit last-of-type:px-3',
        [
          active &&
            'before:absolute before:inset-y-[-5px] before:inset-x-[-3px] before:border-neutral-300 before:border-[5px] before:bg-neutral-300/70 z-20',
        ]
      )}
    >
      <p className="relative z-30">{children}</p>
    </button>
  );
};

export default PaginationButton;
