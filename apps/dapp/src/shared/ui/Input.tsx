import classNames from 'classnames';
import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  label: string;
  type: 'email' | 'password' | 'range' | 'tel' | 'text';
  // type: Pick<
  //   HTMLInputTypeAttribute,
  //   'checkbox' | 'email' | 'number' | 'password' | 'range' | 'tel' | 'text'
  // >;
};

export const Input = ({
  type,
  className,
  id,
  name,
  label,
  placeholder,
  onChange,
  value,
  error,
  disabled,
  ...rest
}: Props) => (
  <div className="my-3">
    <label
      htmlFor={id}
      className="mb-2 ml-1 block cursor-pointer text-sm font-medium text-neutral-800 first-letter:uppercase"
    >
      {label}
    </label>
    <input
      {...rest}
      id={id}
      name={name}
      type={type}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      className={classNames(
        className,
        'block w-full rounded border bg-gray-50 p-2 placeholder:text-neutral-300',
        [error ? 'border-danger-600' : 'border-neutral-300'],
        [disabled && 'cursor-not-allowed opacity-40'],
        'shadow-sm focus:border-primary focus:outline-none focus:ring focus:ring-primary-light focus:ring-opacity-50'
      )}
    />
    <p className="min-h-[24px] text-danger-600">{error && `* ${error}`}</p>
  </div>
);
