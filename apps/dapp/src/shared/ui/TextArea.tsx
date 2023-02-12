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
}: Props) => (
  <div className="my-2">
    <label
      htmlFor={id}
      className="mb-2 block cursor-pointer text-sm font-medium text-neutral-800 first-letter:uppercase"
    >
      {label}
    </label>
    <textarea
      name={name}
      id={id}
      cols={cols}
      rows={rows}
      className={classNames(
        'block w-full resize-none rounded border bg-gray-50 p-2',
        [error ? 'border-danger-600' : 'border-neutral-300'],
        'shadow-sm focus:border-primary focus:outline-none focus:ring focus:ring-primary-light focus:ring-opacity-50'
      )}
      {...rest}
    />
    <p className="min-h-[24px] text-danger-600">{error && `* ${error}`}</p>
  </div>
);
