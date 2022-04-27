import React from 'react';
import { useFormik } from 'formik';
import useUser from '../src/hooks/useUser';

import Metamask from '../assets/metamask.svg';

import Input from 'src/components/utils/Input';
import Button from 'src/components/utils/Button';
import { EthersProvider } from 'src/hooks/useEthers';
import { Toaster } from 'react-hot-toast';

const validate = (values) => {
  const errors = {};
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(values.email)) errors.email = 'Invalid e-mail';
  if (values.firstName.length === 0) errors.firstName = 'Type your name';
  if (values.lastName.length === 0) errors.lastName = 'Type your last name';
  if (values.nick.length === 0) errors.nick = 'Type your nick';

  return errors;
};

const signin = () => {
  const { signIn } = useUser();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      nick: '',
    },
    validate,
    onSubmit: async (values) => {
      // formik.errors.nick = 'Is registered';

      if (!Object.keys(formik.errors).length) {
        signIn(values);
      }
    },
  });
  return (
    <div className="position-center flex flex-col w-full p-3 rounded-lg border-2 border-gray-300 md:max-w-md md:p-5">
      <h1 className="text-4xl text-center flex justify-center items-center gap-3">
        Sign in <Metamask className="text-7xl" />
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
        <Button type="submit" className="w-full mt-3">
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default signin;

signin.getLayout = (page) => (
  <EthersProvider>
    <Toaster position="top-center" reverseOrder={false} />
    {page}
  </EthersProvider>
);
