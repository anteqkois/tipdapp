import { InformationCircleIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { ethers } from 'ethers';
import { InputHTMLAttributes, useCallback } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  label: string;
  value: string;
  integer?: number;
  fractional?: number;
  withRatio: boolean;
  ratio?: string;
  symbol?: string;
};

export const InputCurrency = ({
  className,
  id,
  name,
  label,
  placeholder,
  onChange,
  value,
  error,
  integer = 10,
  fractional = 18,
  withRatio,
  ratio,
  symbol,
  disabled,
  ...rest
}: Props) => {
  const currencyRegex = useCallback(
    (target: string) => {
      const pattern = new RegExp(
        `^(\\d{0,${integer}})$|^(\\d{0,${integer}}[.])$|^(\\d{0,${integer}}[.]\\d{0,${fractional}})$`,
        'g'
      );

      return target.match(pattern);
    },
    [integer, fractional]
  );

  return (
    <div className="my-3">
      <label
        htmlFor={label}
        className="mb-2 ml-1 block text-sm font-medium text-neutral-800 first-letter:uppercase"
      >
        {label}
      </label>
      <div className="relative">
        <input
          {...rest}
          id={id}
          name={name}
          type="text"
          inputMode="decimal"
          onChange={(e) => {
            const match = currencyRegex(e.target.value);
            if (match) {
              e.target.value = match[0] === '.' ? '0.' : match[0];
              onChange?.(e);
            }
          }}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          className={classNames(
            className,
            'block w-full rounded border bg-gray-50 p-2 placeholder:text-neutral-300',
            [error ? 'border-danger-600' : 'border-neutral-300'],
            [disabled && 'opacity-40'],
            'shadow-sm focus:border-primary focus:outline-none focus:ring focus:ring-primary-light focus:ring-opacity-50',
            withRatio && 'pb-7'
          )}
        />
        {/* // TODO add UseDebounce */}
        {ratio && value && (
          <span className="absolute bottom-1 left-2 flex items-center text-sm text-neutral-500">
            <InformationCircleIcon className="icon w-5 bg-transparent stroke-neutral-500 stroke-2" />
            {`
              ${value} ${symbol?.toUpperCase()} ≈ ${ethers.utils.formatUnits(
              ethers.utils
                .parseUnits(value)
                .mul(ethers.utils.parseUnits(ratio))
                .div(ethers.constants.WeiPerEther)
            )}$
                `}
          </span>
        )}
      </div>
      <p className="min-h-[24px] text-danger-600">{error && `* ${error}`}</p>
    </div>
  );
};
