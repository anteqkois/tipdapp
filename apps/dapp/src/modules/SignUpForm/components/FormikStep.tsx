import { FormEvent } from 'react';

type Props = {
  label: string;
  onSubmit?: FormEvent<HTMLFormElement>;
  children: JSX.Element;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FormikStep = ({ label, onSubmit, children }: Props) => children;
