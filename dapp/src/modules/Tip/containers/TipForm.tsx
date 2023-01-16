import { Button, Input, InputCurrency, Link, TextArea } from '@/shared/ui';
import { ValidationError } from '@tipdapp/server';
import { useFormik } from 'formik';
import Image from 'next/image';
import { z } from 'zod';

const initialValues = { nick: '', message: '', token: null, amount: '' };

const fieldValidation = z.object({
  nick: z.string().min(3, 'Nick to short'),
  message: z.string().min(3, 'Message to short').max(220, 'Message to long'),
  amount: z
    .string()
    .regex(new RegExp('(?!0)\\d+', 'g'), { message: 'Wrong tip amount' }),
});

export const TipForm = () => {
  const onSubmit = () => {};

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        fieldValidation.parse(values);
      } catch (error: any) {
        formik.setErrors(
          ValidationError.mapArrayByField(
            ValidationError.fromZodErrorArray(error.issues)
          )
        );
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <h6>Tip form</h6>
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
          chose token
          <InputCurrency
            label="Amount"
            id="amount"
            name="amount"
            error={formik.errors.amount}
            value={formik.values.amount}
            onChange={formik.handleChange}
          />
          <Image
            alt="btc"
            src={`/token/btc.png`}
            width={100}
            height={100}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          // disabled={!registerUser.write}
        >
          Send Tip
        </Button>
      </form>
      <p>
        Making a payment, you accept the{' '}
        <Link>General Terms and Conditions</Link> and the{' '}
        <Link>Privacy Policy</Link>
      </p>
    </>
  );
};
