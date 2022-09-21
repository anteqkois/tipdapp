import { UserIcon, WalletIcon } from '@heroicons/react/24/outline';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveStep, selectErrors, selectStatus, setStep, validateUserData } from 'src/lib/redux/signUpFormSlice';
import ConnectWallet from '../../assets/connectWallet.svg';
import { Button, Input } from '../utils';
import { Stepper } from '../utils/Stepper';
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

const initialValues = {
  email: '',
  firstName: '',
  lastName: '',
  nick: '',
};

export const SignUpForm = () => {
  const { openConnectModal } = useConnectModal();

  const dispatch = useDispatch();
  const errors = useSelector(selectErrors);
  const status = useSelector(selectStatus);
  const step = useSelector(selectActiveStep);

  //Display Error message
  useEffect(() => {
    if (errors) {
      const errorsTemp = {};

      errors.forEach((error) => {
        errorsTemp[error.field] = error.message;
      });

      formik.setErrors(errorsTemp);
    }
  }, [errors]);

  const formik = useFormik({
    initialValues: initialValues,
    validate,
    onSubmit: async (values) => {
      try {
        if (!Object.keys(formik.errors).length) {
          if (step === 1) {
            //validate userData on backend
            dispatch(validateUserData(values));
          }
          if (step === 2) {
            openConnectModal();
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const FormSteps = [
    <FormikStep label="User Details">
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
    <FormikStep label="Connect Wallet">
      <ConnectWallet className="w-5/6 h-52 mx-auto my-5" />
      <p className="text-alert-600 ">{formik.errors.walletAddress && `* ${formik.errors.walletAddress}`}</p>
      <Button className="w-full mt-4" option="success" onClick={() => setStep((prev) => --prev)}>
        Connect wallet
      </Button>
    </FormikStep>,
  ];

  const StepIcons = [<UserIcon className="stroke-current h-6" />, <WalletIcon className="stroke-current h-6" />];

  return (
    <>
      <h1 className="flex-center text-2xl mb-3 ">{FormSteps[step - 1].props.label}</h1>
      <Stepper stepCount={FormSteps.length} icons={StepIcons} activeStep={step} />
      <form onSubmit={formik.handleSubmit}>
        {FormSteps[step - 1]}
        <div className="flex gap-3">
          {step > 1 && (
            <Button className="w-full mt-3" onClick={() => dispatch(setStep(step - 1))}>
              Back
            </Button>
          )}
          {step < FormSteps.length && (
            <Button className="w-full mt-3" type="submit" option="success">
              Next
            </Button>
          )}
        </div>
      </form>
    </>
  );
};
