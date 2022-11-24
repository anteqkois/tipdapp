// 'use client'
import { signUp, validateFormData } from '@/api/auth';
import { Close } from '@/components/utils';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { SiweMessage } from 'siwe';
import { useDisconnect } from 'wagmi';
import { useUser } from '.';
import {
  ApiError,
  AsyncStatus,
  ValidationError,
  ZodParseErrors,
} from '../types';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  nick: string;
  address: null;
};

type State = {
  data: FormData;
  status: AsyncStatus;
};

const initialState: State = {
  data: {
    firstName: '',
    lastName: '',
    email: '',
    nick: '',
    address: null,
  },
  status: 'idle',
};

export const useSignUpForm = () => {
  const { openConnectModal } = useConnectModal();
  const { disconnectAsync } = useDisconnect();
  // store form data in url query ?
  // const [formState, setFormState] = useState<State>(initialState);
  // const [formState, setFormState] = useLocalStorage<State>(
  //   'formState',
  //   initialState
  // );
  const formStateRef = useRef<State>(initialState);
  const [step, setStep] = useState(1);

  const router = useRouter();
  const { setStatus, setUser } = useUser();

  const formik = useFormik({
    initialValues: formStateRef.current.data,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        if (!Object.keys(formik.errors).length) {
          if (step === 1) {
            //validate userData on backend
            try {
              const data = await validateFormData(values);
              // formStateRef.current.data = values
              formStateRef.current = { data: values, status: 'success' };
              setStep((prev) => ++prev);
            } catch (error: any) {
              const errorsTemp: ZodParseErrors = {};
              error.forEach((error: ValidationError) => {
                errorsTemp[error.field] = error.message;
              });

              formik.setErrors(errorsTemp);
            }
          } else if (step === 2) {
            // await disconnectAsync();
            openConnectModal?.();
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const register = async (
    message: SiweMessage,
    signature: string
  ): Promise<boolean> => {
    try {
      const response = await signUp({
        message: message,
        signature,
        formData: formStateRef.current.data,
      });
      setStatus('authenticated');
      setUser(response.user);
      toast.success(response.message);
      router.push('/user/dashboard');
      return true;
    } catch (errors: any) {
      toast(
        (t) => (
          <span>
            <span className="flex items-center justify-between">
              <h6 className="py-2">Validation Error</h6>
              <Close onClick={() => toast.dismiss(t.id)} />
            </span>
            <ul className="px-4 flex flex-col gap-3 list-['📌']">
              {errors.map((error: ApiError) => (
                <li
                  key={error.code}
                  className="pl-1"
                >
                  {error.message}
                </li>
              ))}
            </ul>
          </span>
        ),
        { duration: Infinity, id: 'validationError' }
      );
      const errorsTemp: ZodParseErrors = {};
      errors.forEach((error: ValidationError) => {
        errorsTemp[error.field] = error.message;
      });

      formik.setErrors(errorsTemp);
      return false;
    }
  };
  //TODO clear LocalStorage after signup

  return {
    formik,
    formState: formStateRef.current,
    setStep,
    // setFormData,
    register,
    step,
  };
};