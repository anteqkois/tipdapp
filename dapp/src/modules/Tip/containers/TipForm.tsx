import { Button, Input, Link, TextArea } from '@/shared/ui';
import { ValidationError } from '@tipdapp/server';
import { useFormik } from 'formik';
import { z } from 'zod';

const initialValues = { nick: '', message: '', token: null, amount: 0 };

const fieldValidation = z.object({
  nick: z.string().min(3, 'Nick to short'),
  message: z.string().min(3, 'Message to short').max(220, 'Message to long'),
});

export const TipForm = () => {
  const onSubmit = () => {};

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      // console.log(values);

      // if (!Object.keys(formik.errors).length) {
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
            id="message"
            name="message"
            error={formik.errors.message}
            value={formik.values.message}
            onChange={formik.handleChange}
          />
          chose token type amouint
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
