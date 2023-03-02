'use client';

import {
  formTokenOptions,
  SelectTokens,
} from '@/modules/Token/components/SelectTokens';
import { useTokenFind } from '@/modules/Token/hooks';
import {
  Button,
  CustomConnectButton,
  InfoMessage,
  Input,
  InputCurrency,
  Link,
  TextArea,
} from '@/shared/ui';
import { useTipper } from '@/shared/User/hooks/useTipper';
import { apiClient, ValidationError } from '@tipdapp/api';
import { Address, TokenCoinGecko } from '@tipdapp/types';
import { useFormik } from 'formik';
import { useMemo } from 'react';
import { z } from 'zod';

const initialValues = {
  nick: '',
  message: '',
  tokenAddress: '',
  amount: '',
};

// TODO if user didn't chose token, show information that donate to tis user can't be perform
type Props = {
  userAddress: Address;
  avaibleTokenIds?: string[];
  messageLength?: number;
  tokens: TokenCoinGecko[];
};

export const TipForm = ({
  userAddress,
  // avaibleTokenIds,
  tokens,
  messageLength = 250,
}: Props) => {
  const { data } = useTokenFind();
  const { status } = useTipper();

  // TODO filter token which should be avaible
  const tokensToSelect = useMemo(
    () => data?.tokens && formTokenOptions(data.tokens),
    [data?.tokens]
  );

  const tipFieldValidation = useMemo(
    () =>
      z.object({
        nick: z.string().min(3, 'Nick to short'),
        message: z
          .string()
          .min(3, 'Message to short')
          .max(messageLength, 'Message to long'),
        amount: z
          .string()
          .regex(new RegExp('(?!0)\\d+', 'g'), { message: 'Wrong tip amount' }),
        // .regex(/^(?!0)\d+$/g, { message: 'Wrong tip amount' }),
        tokenAddress: z.string().length(42, 'Chose token'),
      }),
    [messageLength]
  );

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        tipFieldValidation.parse(values);
        const dataToSign = {
          tokenAmount: values.amount,
          tokenAddress: values.tokenAddress as Address,
          userAddress,
        };

        const { signature, signatureData } = await apiClient.tips.signature(
          dataToSign
        );

        console.log({ signature, signatureData });
      } catch (error: any) {
        formik.setErrors(
          ValidationError.mapArrayByField(
            ValidationError.fromZodErrorArray(error.issues)
          )
        );
      }
    },
  });

  const selectedToken = useMemo(() => {
    if (tokensToSelect) {
      // TODO implement ratio in better way, token select should store all selected token information !
      const selectedTokenFromInput = tokensToSelect.find(
        (token) => token.address === formik.values.tokenAddress
      );
      return tokens.find((token) => token.id === selectedTokenFromInput?.id);
    }
    return undefined;
  }, [formik.values.tokenAddress, tokens, tokensToSelect]);

  return status === 'authenticated' ? (
    <form onSubmit={formik.handleSubmit}>
      <h5>Your tip details</h5>
      <div>
        <Input
          label="Nick"
          type="text"
          id="nick"
          name="nick"
          error={formik.errors.nick}
          value={formik.values.nick}
          onChange={formik.handleChange}
        />
        <div className="relative">
          <TextArea
            label="Message"
            id="message"
            name="message"
            error={formik.errors.message}
            value={formik.values.message}
            onChange={formik.handleChange}
          />
          <span className="absolute bottom-7 right-2 italic text-primary-400">
            {formik.values.message.length}/{messageLength}
          </span>
        </div>
        {tokensToSelect && (
          <SelectTokens
            label="Choose the token you want to use to send the tip"
            id="tokenAddress"
            options={tokensToSelect}
            name="tokenAddress"
            closeMenuOnSelect
            // defaultValue={
            //   // tokensToSelect.find((token) => token.symbol === 'sand')?.address
            //   tokensToSelect.find((token) => token.symbol === 'sand')
            // }
            // defaultValue={tokensToSelect[0]}
            setFieldValue={formik.setFieldValue}
            error={formik.errors.tokenAddress}
          />
        )}
        <p className="text-xs italic md:hidden">
          *Table with token prices is
          <Link
            className="pl-0.5"
            href="#tokenPrices"
            target="_self"
          >
            below.
          </Link>
        </p>
        <InputCurrency
          label="Amount"
          id="amount"
          name="amount"
          withRatio
          ratio={selectedToken?.current_price.toString()}
          symbol={selectedToken?.symbol}
          error={formik.errors.amount}
          value={formik.values.amount}
          onChange={formik.handleChange}
        />
      </div>
      <Button
        type="submit"
        className="w-full"
        // disabled={!registerUser.write}
      >
        Prepare Tip Transaction
      </Button>
      <p className="px-2 pt-2">
        Making a payment, you accept the{' '}
        <Link href="/conditions">General Terms and Conditions</Link> and the{' '}
        <Link href="/privacypolice">Privacy Policy</Link>
      </p>
    </form>
  ) : (
    <div className="flex flex-col flex-wrap items-center gap-2">
      <CustomConnectButton />
      <InfoMessage>Connect wallet if you want to tip this user.</InfoMessage>
    </div>
  );
};
