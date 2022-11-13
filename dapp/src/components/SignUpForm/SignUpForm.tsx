'use client';
import { useSignUpForm } from '@/hooks';
import { UserIcon, WalletIcon } from '@heroicons/react/24/outline';
import ConnectWallet from '../../assets/connectWallet.svg';
import { Button, Input } from '../utils';
import { Stepper } from '../utils/Stepper';
import { FormikStep } from './FormikStep';

export const SignUpForm = () => {
  const { formik, formState, setStep, setFormData } = useSignUpForm();

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
        option="success"
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
        {console.log(formState.step - 1)}
        {console.log(formState.step)}
        {console.log(FormSteps[formState.step - 1])}
        {FormSteps[formState.step - 1].props.label}
      </h1>
      <Stepper
        stepCount={FormSteps.length}
        icons={StepIcons}
        activeStep={formState.step}
      />
      <form onSubmit={formik.handleSubmit}>
        {FormSteps[formState.step - 1]}
        <div className="flex gap-3">
          {formState.step > 1 && (
            <Button
              className="w-full mt-3"
              onClick={() => setStep((prev) => --prev)}
            >
              Back
            </Button>
          )}
          {formState.step < FormSteps.length && (
            <Button
              className="w-full mt-3"
              type="submit"
              option="success"
            >
              Next
            </Button>
          )}
        </div>
      </form>
    </>
  );
};
