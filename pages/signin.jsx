// import Input from '../components/utils/Input';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import useUser from '../hooks/useUser';
import toast from 'react-hot-toast';

// import Metamask from '../assets/metamask.svg';
// import { ReactComponent as Metamask } from '../assets/metamask.svg';

import Input from '@/components/utils/Input';
import Button from '@/components/utils/Button';

const signin = () => {
  const { signIn } = useUser();
  const [invalidData, setInvalidData] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      nick: '',
    },
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

      if (!emailRegex.test(values.email)) {
        toast.error('Invalid e-mail');
        setInvalidData(true);
      }
      if (values.firstName.length === 0) {
        toast.error('Type your name');
        setInvalidData(true);
      }
      if (values.lastName.length === 0) {
        toast.error('Type your last name');
        setInvalidData(true);
      }
      if (values.nick.length === 0) {
        toast.error('Type your nick');
        setInvalidData(true);
      }

      if (!invalidData) {
        signIn(...values);
      }
    },
  });
  return (
    <div
      className={`position-center flex flex-col w-full p-3 rounded-lg border-2 ${
        invalidData ? 'border-red-500' : 'border-gray-300'
      } md:max-w-md md:p-5`}
    >
      <h1 className="text-4xl text-center">Sign in</h1>
      <form onSubmit={formik.handleSubmit}>
        <Input
          id="email"
          name="email"
          label="e-mail"
          type="email"
          placeholder="johnWhite122@gmail.com"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <Input
          id="firstName"
          name="firstName"
          label="first name"
          type="text"
          placeholder="John"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        <Input
          id="lastName"
          name="lastName"
          label="last name"
          type="text"
          placeholder="White"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        <Input
          id="nick"
          name="nick"
          label="nick"
          type="text"
          placeholder="Whitex2115"
          onChange={formik.handleChange}
          value={formik.values.nick}
        />
        <Button type="submit" className="w-full mt-3">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default signin;
