import classNames from 'classnames';
import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  label: string;
};

export const CheckBox = ({
  className,
  id,
  name,
  label,
  onChange,
  checked,
  error,
  disabled,
  ...rest
}: Props) => (
  <div className="my-3 flex items-start gap-2 pl-2">
    <input
      {...rest}
      id={id}
      name={name}
      type="checkbox"
      onChange={onChange}
      checked={checked}
      disabled={disabled}
      className={classNames(
        className,
        'mt-1 aspect-square w-4 cursor-pointer rounded accent-primary',
        [error ? 'border-danger-600' : 'border-neutral-300'],
        [disabled && 'cursor-not-allowed opacity-40'],
        'shadow-sm focus:outline-none focus:ring focus:ring-primary-light focus:ring-opacity-50 focus:ring-offset-1'
      )}
    />
    <div>
      <label
        htmlFor={id}
        className="cursor-pointer text-sm font-medium text-neutral-800 first-letter:uppercase"
      >
        {label}
      </label>
      <p className="min-h-[24px] text-danger-600">{error && `* ${error}`}</p>
    </div>
  </div>
);
