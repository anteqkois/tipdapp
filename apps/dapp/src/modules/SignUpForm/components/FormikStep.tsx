import { FormEvent, ReactNode } from 'react';

type Props = {
  label: string;
  onSubmit?: FormEvent<HTMLFormElement>;
  children: ReactNode;
};

export const FormikStep = ({ label, onSubmit, children }: Props) => <>{children}</>;
