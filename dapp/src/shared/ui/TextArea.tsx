import classNames from 'classnames';
import { TextareaHTMLAttributes } from 'react';

type Props = {
  cols?: number;
  rows?: number;
  name: string;
  id: string;
  label: string;
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = ({
  cols = 30,
  rows = 10,
  error,
  id,
  label,
  name,
  ...rest
}: Props) => {
  return (
    <>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-neutral-800 first-letter:uppercase"
      >
        {label}
      </label>
      <textarea
        name={name}
        id={id}
        cols={cols}
        rows={rows}
        className={classNames(
          'block p-2 w-full resize-none bg-gray-50 rounded border',
          [error ? 'border-danger-600' : 'border-neutral-300'],
          'shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50'
        )}
        {...rest}
      ></textarea>
      <p className="text-danger-600 min-h-[24px]">{error && `* ${error}`}</p>
    </>
  );
};
