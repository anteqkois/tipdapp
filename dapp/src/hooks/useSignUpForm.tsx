// 'use client'
import { signUp, validateFormData } from '@/api/auth';
import { Close } from '@/components/utils';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
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
import useLocalStorage from './useLocalStorage';

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
  step: number;
  // errors: ValidationError[] | null;
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
  step: 1,
  // errors: null,
};

export const useSignUpForm = () => {
  const { openConnectModal } = useConnectModal();
   const { disconnectAsync } = useDisconnect();
  // store form data in url query ?
  const [formState, setFormState] = useLocalStorage<State>(
    'formState',
    initialState
  );
  const setStep = (cb: (step: number) => number) =>
    setFormState((state) => ({ ...state, step: cb(state.step) }));

  const setFormData = (formData: FormData) =>
    setFormState((state) => ({ ...state, data: formData }));

  const router = useRouter();
  const { setStatus, setUser } = useUser();


  const formik = useFormik({
    initialValues: formState.data,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        if (!Object.keys(formik.errors).length) {
          if (formState.step === 1) {
            //validate userData on backend
            try {
              const data = await validateFormData(values);
              setFormState((state) => ({
                ...state,
                data: values,
                step: ++state.step,
              }));
            } catch (error: any) {
              const errorsTemp: ZodParseErrors = {};
              error.forEach((error: ValidationError) => {
                errorsTemp[error.field] = error.message;
              });

              formik.setErrors(errorsTemp);
            }
          } else if (formState.step === 2) {
            await disconnectAsync();
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
        formData: formState.data,
      });
      setStatus('authenticated');
      setUser(response.user);
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

  return { formik, formState, setStep, setFormData, register };
};
