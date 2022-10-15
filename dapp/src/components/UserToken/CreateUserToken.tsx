import { useLocalStorage } from '@/hooks';
import { useQoistipSign } from '@/hooks/useQoistipSign';
import { useSession } from '@/lib/useSession';
import { userTokenSchemaForm } from '@/schema/userTokenSchema.js';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ZodError, ZodIssue } from 'zod';
import { Button, Card, Input } from '../utils';
import { Details } from '../utils/Details';

type Errors = Record<string, string>;

const validate = (values: UserTokenFormData): Errors => {
  const errors: Errors = {} as Errors;

  try {
    userTokenSchemaForm.parse(values);
  } catch (error) {
    if (error instanceof ZodError) {
      error.issues.forEach((zodError: ZodIssue) => {
        errors[zodError.path[0]] = zodError.message;
      });
    }
  }

  return errors;
};

const initialUserToken = {
  symbol: '',
  name: '',
};

interface UserTokenFormData {
  symbol?: string;
  name?: string;
}

export const CreateUserToken = () => {
  const [errors, setErrors] = useState<Errors>({} as Errors);
  const [userTokenFormData, setUserTokenFormData] =
    useLocalStorage<UserTokenFormData>('userTokenFormData', initialUserToken);
  const { refreshSessionData } = useSession();

  const { registerUser } = useQoistipSign();

  useEffect(() => {
    (async () => {
      if (registerUser?.data?.wait) {
        await registerUser.data?.wait(1);
        toast.success(`Transaction have 1 confirmation`, {
          id: 'confirmation',
          position: 'bottom-right',
          duration: 6000,
        });
        await registerUser.data?.wait(2);
        toast.success(`Transaction have 2 confirmation`, {
          id: 'confirmation',
          position: 'bottom-right',
          duration: 6000,
        });

        setUserTokenFormData(initialUserToken);
        await refreshSessionData();

        await registerUser.data?.wait(3);
        toast.success(`Transaction have 3 confirmation`, {
          id: 'confirmation',
          position: 'bottom-right',
          duration: 6000,
        });

        // try {
        // } catch (error) {
        //   console.log(error);
        // }
      }
    })();
  }, [registerUser?.data]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setErrors({} as Errors);
      const error = validate(userTokenFormData);

      if (Object.keys(error).length === 0) {
        if (registerUser?.writeAsync) {
          const writePromise = registerUser.writeAsync({
            recklesslySetUnpreparedArgs: [
              userTokenFormData.symbol,
              userTokenFormData.name,
            ],
          });
          toast.promise(
            writePromise,
            {
              loading: 'Wait for send transaction',
              success: 'Your token was succesfully create!',
              error: 'Something went wrong, we can not create your token.',
            },
            { id: 'registerUserPromise' }
          );
        } else {
          toast.error('Something went wrong, we can not create your token.', {
            id: 'registerUserPromise',
          });
        }
      } else {
        setErrors(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // TODO useDebounce!!!
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setUserTokenFormData((prev) => ({
      ...prev,
      // [e.target.id]: e.target.value,
      [e.currentTarget.id]: e.currentTarget.value,
    }));
  };

  const resetForm = () => {
    setUserTokenFormData(initialUserToken);
  };

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <h4>You don&apos;t have your own token yet. Create it below.</h4>
        <div>
          <Input
            id="name"
            name="name"
            label="Token name"
            type="text"
            onChange={handleChange}
            value={userTokenFormData.name ?? ''}
            error={errors?.name}
          />
          <Input
            id="symbol"
            name="symbol"
            label="Token symbol"
            type="text"
            onChange={handleChange}
            value={userTokenFormData.symbol ?? ''}
            error={errors?.symbol}
          />
        </div>
        <Button type="submit">Save</Button>
        <Button
          className="ml-3"
          onClick={resetForm}
          type="reset"
          option="danger"
        >
          Reset from
        </Button>
      </form>
      <Details
        title="More information about token (Decimals, Owner, Total Supply etc.)"
        details="Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati possimus dignissimos sequi voluptatum, omnis magni
          deleniti ducimus voluptatibus. Obcaecati similique ipsum laboriosam libero magnam modi earum voluptatibus. Delectus, in
          veritatis."
      ></Details>
    </Card>
  );
};
