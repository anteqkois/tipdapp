'use client';
import { update } from '@/api/page';
import { Button, Card, Input, Link, Tooltip } from '@/shared/ui';
import { useUser } from '@/shared/User/hooks/useUser';
import {
  isValidationError,
  PageValidation,
  pageValidation,
  ValidationError,
} from '@tipdapp/server';
import classNames from 'classnames';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import ReactSelect, { components, InputProps, OptionProps } from 'react-select';

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

//TODO? use page to be ability in future to change this element by user(for example can change to show default top tiper)
const Page = () => {
  const { user } = useUser();
  // const [SelectRoot, SelectTrigger, SelectItem] = useSelect();
  // const [Select] = useSelect();

  const formik = useFormik({
    initialValues: {
      // baner/themecolor/link to yt.../display total supply of token/link to etherscan token
      affixUrl: user?.streamer?.page?.affixUrl ?? '',
      description: user?.streamer?.page?.description ?? '',
    },
    onSubmit: async (values: PageValidation.Update) => {
      if (!Object.keys(formik.errors).length) {
        try {
          pageValidation.updateParse(values);
          await update(values);
        } catch (error: any) {
          if (isValidationError(error[0])) {
            formik.setErrors(ValidationError.mapArrayByField(error));
          } else {
            console.log(error);
            toast.error(
              'Something went wrong, can not update your page details.'
            );
          }
        }
      }
    },
  });

  // const CustomOption = ({ innerProps, isDisabled }: OptionProps) =>
  //   !isDisabled ? (
  //     <div {...innerProps}>{/* your component internals */}</div>
  //   ) : null;

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
  }: OptionProps<typeof options[0]>) => {
    // console.log(data);
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
          src={data.imageUrl}
        />
        {data.name}
        {children}
      </div>
    ) : null;
  };

  const CustomInput = (props: InputProps<typeof options[0]>) => {
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
    <section>
      <Card className="grid">
        <ReactSelect
          components={{ Option: CustomOption, Input: CustomInput }}
          options={options}
          isMulti
          closeMenuOnSelect={false}
        />
        <form onSubmit={formik.handleSubmit}>
          <Link href={`streamer/${user?.streamer?.page?.affixUrl}`}>
            <h6 className="p-1"> See your page</h6>
          </Link>
          <Tooltip content="Disabled option now">
            <div className="relative">
              <Input
                id="affixUrl"
                name="affixUrl"
                label="URL of your side"
                type="text"
                className="pl-52"
                disabled={true}
                onChange={formik.handleChange}
                value={formik.values.affixUrl}
                error={formik.errors.affixUrl}
              ></Input>
              <span className="absolute text-neutral-light top-[29px] left-[1px] p-2 bg-neutral-200 rounded  rounded-tr-none rounded-br-none">
                {`https://tipdapp/u/${user?.activeRole}/${user?.nick}`}
              </span>
              <span className="absolute text-neutral-light top-[29px] right-[1px] p-2 bg-neutral-200 rounded  rounded-tl-none rounded-bl-none">
                {user?.streamer?.page?.affixUrl.length}/20
              </span>
            </div>
          </Tooltip>
          <div className="my-3">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-neutral-800 first-letter:uppercase"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              cols={30}
              rows={10}
              onChange={formik.handleChange}
              className={classNames(
                'block p-2 w-full resize-none bg-gray-50 rounded border',
                [
                  formik.errors.description
                    ? 'border-danger-600'
                    : 'border-neutral-300',
                ],
                'shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50'
              )}
            ></textarea>
            <p className="text-danger-600 min-h-[24px]">
              {formik.errors.description && `* ${formik.errors.description}`}
            </p>
          </div>
          {/* <Checkbox.Root
            className="CheckboxRoot"
            defaultChecked
            id="c1"
          >
            <Checkbox.Indicator className="CheckboxIndicator">
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root> */}
          <label
            className="Label"
            htmlFor="c1"
          >
            Accept terms and conditions.
          </label>
          <Button
            className="mt-3"
            type="submit"
          >
            Save
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default Page;
