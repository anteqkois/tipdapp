import { signUp, validateFormData } from '@/api/auth';
import { useLocalStorage } from '@/shared/hooks';
import { Close } from '@/shared/ui';
import { useUser } from '@/shared/User/hooks/useUser';
import { AsyncStatus } from '@/types';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { isApiError, isValidationError, ValidationError } from '@tipdapp/api';
import { UserApi } from '@tipdapp/database';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { SiweMessage } from 'siwe';

type State = {
  data: UserApi.Create.Body & { address?: string };
  status: AsyncStatus;
};

const initialState: State = {
  data: {
    nick: '',
    email: '',
    firstName: '',
    lastName: '',
    roles: ['streamer'],
    address: '',
  },
  status: 'idle',
};

export const useSignUpForm = () => {
  const { openConnectModal } = useConnectModal();
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
            // validate userData on backend
            try {
              await validateFormData(values);
              setFormData(values);
              setStep((prev) => prev + 1);
            } catch (error: any) {
              if (isValidationError(error[0])) {
                formik.setErrors(ValidationError.mapArrayByField(error));
              } else if (isApiError(error[0])) {
                toast.error(error[0].message);
              } else {
                toast.error('Something went wrong, can not register you now.');
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
  }, [clearFormData]);

  const register = async (message: SiweMessage, signature: string) => {
    try {
      const response = await signUp({
        message,
        signature,
        formData: JSON.parse(localStorage.getItem('formData') ?? ''),
      });
      setStatus('authenticated');
      setUser(response.user);
      toast.success(response.message);
      clearFormData();
      router.push('/streamer/dashboard');
      return true;
    } catch (errors: any) {
      if (isValidationError(errors[0])) {
        toast(
          (t) => (
            <span>
              <span className="flex items-center justify-between">
                <h6 className="py-2">Validation Error</h6>
                <Close onClick={() => toast.dismiss(t.id)} />
              </span>
              <ul className="flex list-['📌'] flex-col gap-3 px-4">
                {errors.map((error: any) => (
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
        formik.setErrors(ValidationError.mapArrayByField(errors));
      } else {
        console.log(errors);
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
