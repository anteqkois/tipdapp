import { Token } from '@tipdapp/types';
import Image from 'next/image';
import ReactSelect, {
  components,
  InputProps,
  MultiValue,
  MultiValueGenericProps,
  OptionProps,
  SingleValue,
  SingleValueProps
} from 'react-select';
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager';

type TokenOption = {
  name: string;
  imageUrl: string | null;
  symbol: string;
  value: string;
};

type GroupedOption = {
  label: string;
  options: TokenOption[];
};

type Props = {
  name: string;
  error?: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => any;
  label: string;
} & Omit<
  StateManagerProps<TokenOption, false | true, GroupedOption>,
  'value' | 'onChange'
>;

const formTokenOptions = (tokens: Token[]) =>
  tokens.map((token) => ({
    address: token.address,
    name: token.name,
    imageUrl: token.imageUrl,
    symbol: token.symbol,
    id: token.id,
    coinGeckoId: token.coinGeckoId,
    value: token.address,
  }));

const CustomOption = ({
  innerProps,
  innerRef,
  isDisabled,
  children,
  data,
}: OptionProps<TokenOption, true | false, GroupedOption>) =>
  !isDisabled ? (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-neutral-150"
    >
      <Image
        height={24}
        width={24}
        className="rounded-full"
        alt={data.name}
        // TODO remove when package was updated
        // @ts-ignore
        src={data.imageUrl}
      />
      {data.name}
      {children}
    </div>
  ) : null;

const CustomMultiValueLabel = ({
  data,
  selectProps,
}: MultiValueGenericProps<TokenOption, true | false, GroupedOption>) => (
  <components.MultiValueLabel
    data={data}
    selectProps={selectProps}
    innerProps={{ className: 'flex items-center gap-1 pl-1' }}
  >
    <Image
      height={16}
      width={16}
      className="rounded-full"
      alt={data.name}
      src={data.imageUrl}
    />
    {data.symbol.toUpperCase()}
  </components.MultiValueLabel>
);

const CustomSingleValue = ({
  children,
  data,
  ...props
}: SingleValueProps<TokenOption, true | false, GroupedOption>) => (
  <components.SingleValue
    {...props}
    data={data}
    className="inline-flex max-w-xs cursor-pointer items-center gap-2 p-2"
  >
    <Image
      height={24}
      width={24}
      className="rounded-full"
      alt={data.name}
      // TODO remove when package was updated
      src={data?.imageUrl ?? ''}
    />
    {data.name}
    {children}
  </components.SingleValue>
);

const CustomInput = (
  props: InputProps<TokenOption, true | false, GroupedOption>
) => {
  const { isHidden } = props;
  if (isHidden) {
    return <components.Input {...props} />;
  }
  return (
    <components.Input
      {...props}
      inputClassName="focus-visible:ring-0"
    />
  );
};

const SelectTokens = ({
  label,
  error,
  setFieldValue,
  id,
  name,
  options,
  maxMenuHeight = 220,
  isMulti = false,
  ...rest
}: Props) => {
  const onChangeSelect = (
    newValue: SingleValue<TokenOption> | MultiValue<TokenOption>
  ) => {
    if (newValue) {
      // is single value
      if ('value' in newValue) {
        setFieldValue(name, newValue.value);
      } else {
        const values = newValue.map((o) => o.value);
        setFieldValue(name, values);
      }
    }
  };

  return (
    <>
      <label
        htmlFor={id}
        className="mb-2 ml-1 block text-sm font-medium text-neutral-800 first-letter:uppercase"
      >
        {label}
      </label>
      <ReactSelect
        inputId={id}
        name={name}
        placeholder=""
        components={{
          Option: CustomOption,
          Input: CustomInput,
          SingleValue: CustomSingleValue,
          MultiValueLabel: CustomMultiValueLabel,
        }}
        onChange={onChangeSelect}
        maxMenuHeight={maxMenuHeight}
        options={options}
        isMulti={isMulti}
        closeMenuOnSelect={false}
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
            border: error && '1px solid #DC2626',
            background: 'transparent',
          }),
        }}
        {...rest}
        // openMenuOnFocus={true}
        // onFocus={() => setIsOpenMenu(true)}
        // onBlur={() => setIsOpenMenu(false)}
        // menuIsOpen={isOpenMenu}
      />
      <p className="min-h-[24px] text-danger-600">{error && `* ${error}`}</p>
    </>
  );
};

export { formTokenOptions, SelectTokens };
