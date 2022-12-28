// 'use client'
import { signUp, validateFormData } from '@/api/auth';
import { useLocalStorage } from '@/shared/hooks';
import { Close } from '@/shared/ui';
import { useUser } from '@/shared/User/hooks/useUser';
import { AsyncStatus } from '@/types';
import { mapValidationErrors } from '@/utils/error';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { UserValidation } from '@tipdapp/server';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { SiweMessage } from 'siwe';
import { useDisconnect } from 'wagmi';

type State = {
  data: UserValidation.CreateUser & { address?: string };
  status: AsyncStatus;
};

const initialState: State = {
  data: {
    nick: '',
    email: '',
    firstName: '',
    lastName: '',
    roles: ['tipper', 'streamer'],
    // address: '',
  },
  status: 'idle',
};

export const useSignUpForm = () => {
  const { openConnectModal } = useConnectModal();
  const { disconnectAsync } = useDisconnect();
  // store form data in url query ?
  const [formData, setFormData, clearFormData] = useLocalStorage<State['data']>(
    'formData',
    initialState.data
  );
  const [step, setStep] = useState(1);

  const router = useRouter();
  const { setStatus, setUser } = useUser();

  const formik = useFormik({
    initialValues: formData,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        if (!Object.keys(formik.errors).length) {
          if (step === 1) {
            //validate userData on backend
            try {
              const data = await validateFormData(values);
              setFormData(values);
              setStep((prev) => ++prev);
            } catch (error: any) {
              if (error[0].type === 'ValidationError') {
                formik.setErrors(mapValidationErrors(error));
              } else {
                console.log(error);
                toast.error(
                  'Something went wrong, can not update your page details.'
                );
              }
            }
          } else if (step === 2) {
            openConnectModal?.();
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  // TODO implement ability to fill form with previous data
  useEffect(() => {
    window.onbeforeunload = () => clearFormData();

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const register = async (message: SiweMessage, signature: string) => {
    try {
      const response = await signUp({
        message: message,
        signature,
        formData: JSON.parse(localStorage.getItem('formData') ?? ''),
      });
      setStatus('authenticated');
      setUser(response.user);
      toast.success(response.message);
      clearFormData();
      router.push('/streamer/dashboard');
      return true;
    } catch (error: any) {
      toast(
        (t) => (
          <span>
            <span className="flex items-center justify-between">
              <h6 className="py-2">Validation Error</h6>
              <Close onClick={() => toast.dismiss(t.id)} />
            </span>
            <ul className="px-4 flex flex-col gap-3 list-['📌']">
              {error.map((error: any) => (
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

      if (error[0].type === 'ValidationError') {
        console.log(mapValidationErrors(error));
        formik.setErrors(mapValidationErrors(error));
      } else {
        console.log(error);
      }
      return false;
    }
  };

  return {
    formik,
    formData,
    setStep,
    register,
    step,
  };
};
