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
    <div className="flex items-start gap-2 my-3 pl-2">
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
          'mt-1 w-4 aspect-square accent-primary rounded cursor-pointer',
          [error ? 'border-danger-600' : 'border-neutral-300'],
          [disabled && 'opacity-40 cursor-not-allowed'],
          'shadow-sm focus:outline-none focus:ring focus:ring-primary-light focus:ring-opacity-50 focus:ring-offset-1'
        )}
       />
      <div>
        <label
          htmlFor={id}
          className="text-sm font-medium text-neutral-800 first-letter:uppercase cursor-pointer"
        >
          {label}
        </label>
        <p className="text-danger-600 min-h-[24px]">{error && `* ${error}`}</p>
      </div>
    </div>
  );
