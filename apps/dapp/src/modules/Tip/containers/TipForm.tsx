'use client';

import {
  formTokenOptions,
  SelectTokens,
} from '@/modules/Token/components/SelectTokens';
import { useTokenBasicInfoFind } from '@/modules/Token/hooks';
import { useDataFormater, useModal } from '@/shared/hooks';
import {
  Button,
  CustomConnectButton,
  InfoMessage,
  InfoParagraph,
  Input,
  InputCurrency,
  Link,
  TextArea,
  TokenQuote,
  ViewOnExplorer,
} from '@/shared/ui';
import { useTipper } from '@/shared/User/hooks/useTipper';
import {
  PaperAirplaneIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import { apiClient, TipApi, ValidationError } from '@tipdapp/api';
import { constants } from '@tipdapp/helpers';
import { Address, NestedUser, TokenCoinGecko } from '@tipdapp/types';
import { ethers } from 'ethers';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { z } from 'zod';

const initialValues = {
  nick: '',
  message: '',
  tokenAddress: '',
  amount: '',
};

// TODO if user didn't chose token, show information that donate to tis user can't be perform
type Props = {
  user: NestedUser;
  avaibleTokenIds?: string[];
  messageLength?: number;
  tokenCoinGecko: TokenCoinGecko[];
};

export const TipForm = ({
  user,
  avaibleTokenIds,
  tokenCoinGecko,
  messageLength = 250,
}: Props) => {
  const { data } = useTokenBasicInfoFind({ ids: avaibleTokenIds });
  const [signatureResponse, setSignatureResponse] =
    useState<TipApi.Signature.ResBody>();
  const { status } = useTipper();
  const [TipModal, TipContent, , setShowTip] = useModal();
  const { formatDateBasic } = useDataFormater();

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
          userAddress: user.address,
        };

        const response = await apiClient.tips.signature(dataToSign);

        setSignatureResponse(response);

        setShowTip(true);
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
      return tokenCoinGecko?.find(
        (token) => token.id === selectedTokenFromInput?.id
      );
    }
    return undefined;
  }, [formik.values.tokenAddress, tokenCoinGecko, tokensToSelect]);

  return status === 'authenticated' ? (
    <form onSubmit={formik.handleSubmit}>
      <TipModal>
        <TipContent
          title="Tip Details"
          icon={<PencilSquareIcon className="icon" />}
        >
          <div className="flex flex-col gap-1">
            <InfoParagraph header="Token">
              <Image
                height={24}
                width={24}
                className="rounded-full"
                alt={selectedToken?.name ?? ''}
                src={selectedToken?.image ?? ''}
              />
              {selectedToken?.name}
            </InfoParagraph>
            <InfoParagraph header="Amount">
              {formik.values.amount}{' '}
              <TokenQuote>{selectedToken?.symbol.toUpperCase()}</TokenQuote>
              <span className="italic text-neutral-400">
                ≈{' '}
                {ethers.utils.formatUnits(
                  signatureResponse?.signedData.amountToMint ?? '0'
                )}
                $
              </span>
            </InfoParagraph>
            <InfoParagraph header="Tip Recipient">{user.nick}</InfoParagraph>
            <InfoParagraph header="Tokens In Return">
              {ethers.utils.formatUnits(
                signatureResponse?.signedData.amountToMint ?? '0'
              )}
              <ViewOnExplorer
                subject="token"
                value="ddede2"
                className="font-semibold"
              >
                <TokenQuote>{user.userToken?.symbol.toUpperCase()}</TokenQuote>
              </ViewOnExplorer>
            </InfoParagraph>
            <InfoParagraph header="Message">
              {formik.values.message}
            </InfoParagraph>
            <InfoParagraph header="Network Fee">~$6.33</InfoParagraph>
            <InfoParagraph header="Dapp Fee">
              {parseInt(constants.config.fee, 10) / 100}%
            </InfoParagraph>
            <InfoParagraph header="Date">
              {signatureResponse?.signedData &&
                formatDateBasic(
                  new Date(signatureResponse.signedData.timestamp * 1000)
                )}
            </InfoParagraph>
            <Button
              icon={
                <PaperAirplaneIcon className="icon -translate-y-0.5 -rotate-45 stroke-2" />
              }
            >
              Send Tip
            </Button>
          </div>
        </TipContent>
      </TipModal>
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
      <p className="px-2 pt-2 text-sm">
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
