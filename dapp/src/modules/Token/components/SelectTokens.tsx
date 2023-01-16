import { Token } from '@tipdapp/server';
import Image from 'next/image';
import { useMemo } from 'react';
import ReactSelect, {
  components,
  InputProps,
  MultiValueGenericProps,
  OptionProps,
} from 'react-select';

const coinsData = [
  {
    address: '0x3845badAde8e6dFF049820680d1F14bD3903a5d0',
    symbol: 'sand',
    // value: 'sand',
    name: 'Sand',
    chainId: 1,
    imageUrl: '/coins/sand.png',
    latestPrice: '0.6386',
  },
  {
    address: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
    symbol: 'shib',
    // value: 'shib',
    name: 'Shiba Inu',
    chainId: 1,
    imageUrl: '/coins/shib.png',
    latestPrice: '0.00001001',
  },
  {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    symbol: 'usdt',
    name: 'Tether',
    chainId: 1,
    imageUrl: '/coins/usdt.png',
    latestPrice: '1.00',
  },
  {
    address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    symbol: 'bnb',
    name: ' Wrapped BNB',
    chainId: 56,
    imageUrl: '/coins/bnb.png',
    latestPrice: '298.36',
  },
  {
    address: '0xbA2aE424d960c26247Dd6c32edC70B295c744C43',
    symbol: 'doge',
    name: 'Binance-Peg Dogecoin Token',
    chainId: 56,
    imageUrl: '/coins/doge.png',
    latestPrice: '0.08449',
  },
  {
    address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
    symbol: 'matic',
    name: 'Polygon',
    chainId: 1,
    imageUrl: '/coins/matic.png',
    latestPrice: '0.9706',
  },
];

type TokenData = Pick<Token, 'imageUrl' | 'name' | 'symbol'> & {
  value: string;
};

export const SelectTokens = () => {
  const options = useMemo(
    () =>
      coinsData.map((coin) => ({
        name: coin.name,
        imageUrl: coin.imageUrl,
        symbol: coin.symbol,
        value: coin.symbol,
      })),
    []
  );
  const CustomOption = ({
    innerProps,
    isDisabled,
    children,
    data,
  }: OptionProps<TokenData>) => {
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

  const CustomMultiValueLabel = (props: MultiValueGenericProps<TokenData>) => {
    console.log(props.data);
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

  const CustomInput = (props: InputProps<TokenData>) => {
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
    <ReactSelect
      placeholder=""
      components={{
        Option: CustomOption,
        Input: CustomInput,
        MultiValueLabel: CustomMultiValueLabel,
      }}
      maxMenuHeight={100}
      options={options}
      isMulti
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
  );
};
