'use client';
import { useSignUpForm } from '@/hooks';
import { UserIcon, WalletIcon } from '@heroicons/react/24/outline';
import ConnectWallet from '../../assets/connectWallet.svg';
import { Button, Input, Stepper } from '../utils';
import { FormikStep } from './FormikStep';

//TODO add suport for more roles, in ferst step chose role
export const SignUpForm = () => {
  const { formik, formState, setStep, step } = useSignUpForm();

  const FormSteps = [
    <FormikStep
      label="User Details"
      key="User Details"
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
      key="Connect Wallet"
    >
      <ConnectWallet className="w-5/6 h-52 mx-auto my-5" />
      <p className="text-danger-600 ">
        {formik.errors.address && `* ${formik.errors.address}`}
      </p>
      <Button
        className="w-full mt-4"
        variant="success"
        type="submit"
      >
        Connect wallet
      </Button>
    </FormikStep>,
  ];

  const StepIcons = [
    <UserIcon
      key="userIcon"
      className="stroke-current h-6"
    />,
    <WalletIcon
      key="WalletIcon"
      className="stroke-current h-6"
    />,
  ];

  return (
    <>
      <h1 className="flex-center text-2xl mb-3 ">
        {FormSteps[step - 1].props.label}
      </h1>
      <Stepper
        stepCount={FormSteps.length}
        icons={StepIcons}
        activeStep={step}
      />
      <form onSubmit={formik.handleSubmit}>
        {FormSteps[step - 1]}
        <div className="flex gap-3">
          {step > 1 && (
            <Button
              className="w-full mt-3"
              onClick={() => setStep((prev) => prev - 1)}
              type="button"
            >
              Back
            </Button>
          )}
          {step < FormSteps.length && (
            <Button
              className="w-full mt-3"
              type="submit"
              variant="success"
            >
              Next
            </Button>
          )}
        </div>
      </form>
    </>
  );
};
