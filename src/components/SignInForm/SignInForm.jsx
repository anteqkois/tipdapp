import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveStep, selectErrors, selectStatus, setStep, validateUserData } from 'src/redux/signInFormSlice';
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

export const SignInForm = () => {
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
        // console.log(values);
        if (!Object.keys(formik.errors).length) {
          if (step === 1) {
            //validate userData on backend
            dispatch(validateUserData(values));
          }
          if (step === 2) {
            //validate on backend
            // openConnectModal();
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
      <Button className="w-full my-8 " option="special" onClick={() => setStep((prev) => --prev)}>
        {/* <Metamask className="text-7xl" /> */}
        Connect wallet
      </Button>
    </FormikStep>,
  ];

  return (
    <>
      <h1 className="flex-center text-2xl mb-3">
        {FormSteps[step - 1].props.label}{/* Sign in */}
        {/* <Metamask className="text-7xl" /> */}
      </h1>
      <Stepper stepCount={4} activeStep={2} />
      {/* <h6>Step {step}/2 ({FormSteps[step - 1].props.label}):</h6> */}
      <form onSubmit={formik.handleSubmit}>
        {FormSteps[step - 1]}
        <div className="flex gap-3">
          {step > 1 && (
            <Button className="w-full mt-3" onClick={() => dispatch(setStep(step - 1))}>
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
