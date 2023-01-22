import { FormikErrors } from 'formik';
import Image from 'next/image';
import ReactSelect, {
  components,
  InputProps,
  MultiValue,
  MultiValueGenericProps,
  OptionProps,
  SingleValue,
  SingleValueProps,
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
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          affixUrl: string;
          description: string;
          tokens: [];
        }>
      >;
  label: string;
} & Omit<
  StateManagerProps<TokenOption, false | true, GroupedOption>,
  'value' | 'onChange'
>;

export const SelectTokens = ({
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
  type Option = TokenOption;
  // const [isOpenMenu, setIsOpenMenu] = useState(false);

  const onChangeSelect = (
    newValue: SingleValue<TokenOption> | MultiValue<TokenOption>
  ) => {
    if (newValue) {
      //is single value
      if ('value' in newValue) {
        setFieldValue(name, newValue.value);
      } else {
        const values = newValue.map((o) => o.value);
        setFieldValue(name, values);
      }
    }
  };

  const CustomOption = ({
    innerProps,
    innerRef,
    isDisabled,
    children,
    data,
  }: OptionProps<Option, true | false, GroupedOption>) => {
    return !isDisabled ? (
      <div
        ref={innerRef}
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

  const CustomMultiValueLabel = ({
    data,
    selectProps,
  }: MultiValueGenericProps<Option, true | false, GroupedOption>) => {
    return (
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
  };

  const CustomSingleValue = ({
    children,
    data,
    ...props
  }: SingleValueProps<Option, true | false, GroupedOption>) => {
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

  const CustomInput = (
    props: InputProps<Option, true | false, GroupedOption>
  ) => {
    if (props.isHidden) {
      return <components.Input {...props} />;
    }
    return (
      <components.Input
        {...props}
        inputClassName="focus-visible:ring-0"
      />
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
        {...rest}
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
          }),
        }}
        // openMenuOnFocus={true}
        // onFocus={() => setIsOpenMenu(true)}
        // onBlur={() => setIsOpenMenu(false)}
        // menuIsOpen={isOpenMenu}
        closeMenuOnSelect={false}
      />
      <p className="text-danger-600 min-h-[24px]">{error && `* ${error}`}</p>
    </>
  );
};
