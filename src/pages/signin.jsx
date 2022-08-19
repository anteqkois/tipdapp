import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import useUser from '@/hooks/useUser';
import Input from '@/components/utils/Input';
import Button from '@/components/utils/Button';
import { Toaster } from 'react-hot-toast';

// import Metamask from '../src/assets/metamask.svg';

const validate = (values) => {
  const errors = {};
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(values.email)) errors.email = 'Invalid e-mail';
  // if (values.firstName.length === 0) errors.firstName = 'Type your name';
  // if (values.lastName.length === 0) errors.lastName = 'Type your last name';
  // if (values.nick.length === 0) errors.nick = 'Type your nick';

  return errors;
};

const signin = () => {
  const { signIn, error } = useUser();

  useEffect(() => {
    if (error) {
      const errors = {};

      error.forEach((error) => {
        errors[error.field] = error.userMessage;
      });

      formik.setErrors(errors);
    }
  }, [error]);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      nick: '',
    },
    validate,
    onSubmit: async (values) => {
      if (!Object.keys(formik.errors).length) {
        await signIn(values);
      }
    },
  });
  return (
    <div className="flex flex-col w-full p-3 px-2 border-2 rounded-lg shadow-xl bg-neutral-50 shadow-neutral-200 md:max-w-md md:p-5 md:position-center">
      <h1 className="flex items-center justify-center gap-3 text-4xl text-center">
        Sign in
        {/* <Metamask className="text-7xl" /> */}
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <Input
          id="email"
          name="email"
          label="e-mail"
          type="email"
          placeholder="johnWhite122@gmail.com"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Input
          id="firstName"
          name="firstName"
          label="first name"
          type="text"
          placeholder="John"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          error={formik.errors.firstName}
        />
        <Input
          id="lastName"
          name="lastName"
          label="last name"
          type="text"
          placeholder="White"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          error={formik.errors.lastName}
        />
        <Input
          id="nick"
          name="nick"
          label="nick"
          type="text"
          placeholder="Whitex2115"
          onChange={formik.handleChange}
          value={formik.values.nick}
          error={formik.errors.nick}
        />
        <Button className="w-full mt-3" type="submit">
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default signin;

//useOtherLayeout
signin.getLayout = (page) => <>{page}</>;
