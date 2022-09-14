import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Button, Input } from '../utils';
import { FormikStep } from './FormikStep';

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

export const STATUS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  // USER_DETAILS: 'USER_DETAILS',
  // CONNECT_WALLET: 'CONNECT_WALLET',
};

// const initialState = {
//   data: {
//     firstName: '',
//     lastName: '',
//     email: '',
//     nick: '',
//     nick2: '',
//   },
//   status: STATUS.IDLE, //'idle' | 'loading' | 'succeeded' | 'failed'
//   step: 1,
//   error: null,
// };
const initialValues = {
  email: '',
  firstName: '',
  lastName: '',
  nick: '',
  nick2: '',
};

// const dispatch = useDispatch();
// const [formData, setFormData] = useState(initialState);
// const error = useSelector(selectError);
// const status = useSelector(selectStatus);
// const step = useSelector(selectActiveStep);

export const SignInForm = () => {
  const { openConnectModal } = useConnectModal();
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: initialValues,
    validate,
    onSubmit: async (values) => {
      console.log(values);
      if (!Object.keys(formik.errors).length) {
        if (step === 1) {
          //validate on backend
        }
        if (step === 2) {
          //validate on backend
          openConnectModal();
        }
        setStep((prev) => ++prev);
      }
    },
  });

  //Display Error message
  useEffect(() => {
    if (error) {
      const errors = {};

      error.forEach((error) => {
        errors[error.field] = error.userMessage;
      });

      formik.setErrors(errors);
    }
  }, [error]);

  // const childrenArray = React.Children.toArray(children);
  // const childrenArray = [];
  const FormSteps = [
    <FormikStep
      label="User Details"
      // onSubmit={() => {
      //   console.log('first');
      // }}
    >
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
    </FormikStep>,
    <FormikStep
      label="Connect Wallet"
      // onSubmit={() => {
      //   console.log('second');
      // }}
    >
      <Button className="w-full my-8 " option="special" onClick={() => setStep((prev) => --prev)}>
      {/* <Metamask className="text-7xl" /> */}
        Connect wallet
      </Button>
    </FormikStep>,
  ];

  return (
    <>
      <h1 className="flex-center text-3xl mb-3">
        Sign in
        {/* <Metamask className="text-7xl" /> */}
      </h1>
      <h6>
        Step {step}/2 ({FormSteps[step - 1].props.label}):
      </h6>
      <form onSubmit={formik.handleSubmit}>
        {FormSteps[step - 1]}
        <div className="flex gap-3">
          {step > 1 && (
            <Button className="w-full mt-3" onClick={() => setStep((prev) => --prev)}>
              Back
            </Button>
          )}
          {step < FormSteps.length && (
            <Button className="w-full mt-3" type="submit">
              Next
            </Button>
          )}
        </div>
      </form>
    </>
  );
};
