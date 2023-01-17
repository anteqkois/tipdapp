import { Token } from '@tipdapp/server';
import Image from 'next/image';
import { InputHTMLAttributes, useMemo } from 'react';
import ReactSelect, {
  components,
  InputProps,
  MultiValueGenericProps,
  OptionProps,
  SingleValueProps,
} from 'react-select';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  tokens: Token[];
  label: string;
  // id: string;
  // name:
  isMulti?: boolean;
} 

export const SelectTokens = ({ tokens, label, id,name, onChange, value, isMulti = false }: Props) => {
  type Option = typeof options[0];
  const options = useMemo(
    () =>
      tokens.map((token) => ({
        name: token.name,
        imageUrl: token.imageUrl,
        symbol: token.symbol,
        value: token.symbol,
      })),
    [tokens]
  );
  const CustomOption = ({
    innerProps,
    isDisabled,
    children,
    data,
  }: OptionProps<Option>) => {
    return !isDisabled ? (
      <div
        {...innerProps}
        className="flex items-center gap-2 p-2 hover:bg-neutral-150 rounded cursor-pointer"
      >
        <Image
          height={24}
          width={24}
          className="rounded-full"
          alt={data.name}
          //TODO remove when package was updated
          //@ts-ignore
          src={data.imageUrl}
        />
        {data.name}
        {children}
      </div>
    ) : null;
  };

  const CustomMultiValueLabel = (props: MultiValueGenericProps<Option>) => {
    return (
      <span className="flex items-center gap-1 pl-1">
        <Image
          height={16}
          width={16}
          className="rounded-full"
          alt={props.data.name}
          src={props.data.imageUrl}
        />
        {props.data.symbol.toUpperCase()}
      </span>
    );
  };

  const CustomSingleValue = ({
    children,
    data,
    ...props
  }: SingleValueProps<Option>) => {
    // console.log(data);
    return (
      <components.SingleValue
        {...props}
        data={data}
        className="inline-flex max-w-xs items-center gap-2 p-2 cursor-pointer"
      >
        <Image
          height={24}
          width={24}
          className="rounded-full"
          alt={data.name}
          //TODO remove when package was updated
          // @ts-ignore
          src={data.imageUrl}
        />
        {data.name}
        {children}
      </components.SingleValue>
    );
  };

  const CustomInput = (props: InputProps<Option>) => {
    if (props.isHidden) {
      return <components.Input {...props} />;
    }
    return (
      <div>
        <components.Input
          {...props}
          inputClassName="focus-visible:ring-0"
        />
      </div>
    );
  };

  return (
    <>
      <label
        htmlFor={id}
        className="block mb-2 ml-1 text-sm font-medium text-neutral-800 first-letter:uppercase"
      >
        {label}
      </label>
      <ReactSelect
        inputId={id}
        name={name}
        // value={value}

        placeholder=""
        components={{
          Option: CustomOption,
          Input: CustomInput,
          SingleValue: CustomSingleValue,
          MultiValueLabel: CustomMultiValueLabel,
        }}
        maxMenuHeight={220}
        options={options}
        isMulti={isMulti}
        styles={{
          control: (base) => ({
            ...base,
            ':focus': {
              border: '1px solid #a855f7',
              boxShadow: '0 0 0 3px rgb(168 85 247 / 0.75)',
            },
            ':focus-visible': {
              border: '1px solid #a855f7',
              boxShadow: '0 0 0 3px rgb(168 85 247 / 0.75)',
            },
            ':focus-within': {
              border: '1px solid #a855f7',
              boxShadow: '0 0 0 3px rgb(168 85 247 / 0.75)',
            },
            boxShadow: 'none',
          }),
        }}
        closeMenuOnSelect={false}
      />
    </>
  );
};
