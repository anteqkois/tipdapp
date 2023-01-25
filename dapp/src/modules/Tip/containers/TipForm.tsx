import {
  formTokenOptions,
  SelectTokens,
} from '@/modules/Token/components/SelectTokens';
import { useTokenFind } from '@/modules/Token/hooks/useTokenQuery';
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
import { Token, ValidationError } from '@tipdapp/server';
import { useFormik } from 'formik';
import { useMemo } from 'react';
import { z } from 'zod';

const initialValues = { nick: '', message: '', token: {} as Token, amount: '' };

const tipFieldValidation = z.object({
  nick: z.string().min(3, 'Nick to short'),
  message: z.string().min(3, 'Message to short').max(220, 'Message to long'),
  amount: z
    .string()
    .regex(new RegExp('(?!0)\\d+', 'g'), { message: 'Wrong tip amount' }),
  token: z.string(),
});

export const TipForm = () => {
  const { data } = useTokenFind();
  const { status, logout, tipper } = useTipper();
console.log(tipper);

  const tokensToSelect = useMemo(
    () => data?.tokens && formTokenOptions(data.tokens),
    [data?.tokens]
  );

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        console.log(values);
        tipFieldValidation.parse(values);
      } catch (error: any) {
        formik.setErrors(
          ValidationError.mapArrayByField(
            ValidationError.fromZodErrorArray(error.issues)
          )
        );
      }
    },
  });

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
        <TextArea
          label="Message"
          id="message"
          name="message"
          error={formik.errors.message}
          value={formik.values.message}
          onChange={formik.handleChange}
        />
        {tokensToSelect && (
          <SelectTokens
            label="Choose the token you want to use to send the tip"
            id="token"
            options={tokensToSelect}
            name="token"
            closeMenuOnSelect={true}
            defaultValue={tokensToSelect.find(
              (token) => token.symbol === 'sand'
            )}
            setFieldValue={formik.setFieldValue}
            error={formik.errors.token as string}
          />
        )}
        <InputCurrency
          label="Amount"
          id="amount"
          name="amount"
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
        Send Tip
      </Button>
      <p className="pt-2 px-2">
        Making a payment, you accept the{' '}
        <Link>General Terms and Conditions</Link> and the{' '}
        <Link>Privacy Policy</Link>
      </p>
    </form>
  ) : (
    <div className="flex flex-col items-center gap-2 flex-wrap">
      <CustomConnectButton />
      <InfoMessage>Connect wallet if you want to tip this user.</InfoMessage>
    </div>
  );
};
