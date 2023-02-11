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
        className="block mb-2 ml-1 text-sm font-medium text-neutral-800 first-letter:uppercase cursor-pointer"
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
          'block p-2 w-full bg-gray-50 rounded border placeholder:text-neutral-300',
          [error ? 'border-danger-600' : 'border-neutral-300'],
          [disabled && 'opacity-40 cursor-not-allowed'],
          'shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50'
        )}
       />
      <p className="text-danger-600 min-h-[24px]">{error && `* ${error}`}</p>
    </div>
  );