import classNames from 'classnames';
import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error: string;
  label: string;
  type: 'checkbox' | 'email' | 'number' | 'password' | 'range' | 'tel' | 'text';
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
}: Props) => {
  return (
    <div className="my-3">
      <label
        htmlFor={label}
        className="block mb-2 ml-1 text-sm font-medium text-neutral-800 first-letter:uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={classNames(
          className,
          'block p-2 w-full bg-gray-50 rounded border',
          [error ? 'border-danger-600' : 'border-neutral-300'],
          'shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50'
        )}
      ></input>
      <p className="text-danger-600 min-h-[24px]">{error && `* ${error}`}</p>
    </div>
  );
};

export default Input;
