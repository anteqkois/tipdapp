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

// type Props = InputHTMLAttributes<HTMLInputElement> & {
//   tokens: Token[];
//   label: string;
//   maxMenuHeight?: number;
//   // id: string;
//   name: string;
//   isMulti?: boolean;
// };

type MyOption = {
  name: string;
  imageUrl: string | null;
  symbol: string;
  value: string;
};

type GroupedOption = {
  label: string; // group label
  options: MyOption[];
};
// component props
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
          tokens: null;
        }>
      >;
  label: string;
} & Omit<
  StateManagerProps<MyOption, false | true, GroupedOption>,
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
}: Props) => {
  type Option = MyOption;

  // const [field, meta, helpers] = useField(name);
  // const { setValue } = helpers;

  // const options = useMemo(
  //   () =>
  //     tokens.map((token) => ({
  //       name: token.name,
  //       imageUrl: token.imageUrl,
  //       symbol: token.symbol,
  //       value: token.symbol,
  //     })),
  //   [tokens]
  // );
  //flatten the options so that it will be easier to find the value
  const flattenedOptions = options?.flatMap((o) => {
    const isNotGrouped = 'value' in o;
    if (isNotGrouped) {
      return o;
    } else {
      return o.options;
    }
  });

  //get the value using flattenedOptions and field.value
  // const value = flattenedOptions?.filter((o) => {
  //   const isArrayValue = Array.isArray(field.value);
  //   if (isArrayValue) {
  //     const values = field.value as Array<any>;
  //     return values.includes(o.value);
  //   } else {
  //     return field.value === o.value;
  //   }
  // });

  const onChangeSelect = (
    newValue: SingleValue<MyOption> | MultiValue<MyOption>
  ) => {
    //here I used explicit typing but there maybe a better way to type the value.
    if (newValue) {
      //is single value
      if ('value' in newValue) {
        setFieldValue(name, newValue.value);
      } else {
        const values = newValue.map((o) => o.value);
        setFieldValue(name, values);
      }
      // const isArray = Array.isArray(val);
      // if (isArray) {
      //   const values = val.map((o) => o.value);
      //   setFieldValue(name, values);
      // } else {
      //   setFieldValue(name, val.value);
      // }
    }
  };

  const CustomOption = ({
    innerProps,
    isDisabled,
    children,
    data,
  }: OptionProps<Option, true | false, GroupedOption>) => {
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

  const CustomMultiValueLabel = (
    props: MultiValueGenericProps<Option, true | false, GroupedOption>
  ) => {
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
  }: SingleValueProps<Option, true | false, GroupedOption>) => {
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

  const CustomInput = (
    props: InputProps<Option, true | false, GroupedOption>
  ) => {
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
        placeholder=""
        components={{
          Option: CustomOption,
          Input: CustomInput,
          SingleValue: CustomSingleValue,
          MultiValueLabel: CustomMultiValueLabel,
        }}
        onChange={onChangeSelect}
        // onChange={(selectedOption) =>
        //   selectedOption?.value && setFieldValue('fieldName', selectedOption.value)
        // }
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
          }),
        }}
        closeMenuOnSelect={false}
      />
      <p className="text-danger-600 min-h-[24px]">{error && `* ${error}`}</p>
    </>
  );
};
