import { useLocalStorage, useQoistipSign } from '@/hooks';
import { ZodParseErrors } from '@/types/index';
import {
  UserTokenFormObject,
  userTokenFormParse,
} from '@/validation/userTokenValidation';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button, Card, Input } from '../utils';
import { Details } from '../utils/Details';

const initialUserToken = {
  symbol: '',
  name: '',
};

export const CreateUserToken = () => {
  const [errors, setErrors] = useState<ZodParseErrors>({} as ZodParseErrors);
  const [userTokenFormData, setUserTokenFormData] =
    useLocalStorage<UserTokenFormObject>('userTokenFormData', initialUserToken);
  //TODO Refreshh user data after create user token
  // const { refreshSessionData } = useSession();

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
        // await refreshSessionData();

        await registerUser.data?.wait(3);
        toast.success(`Transaction have 3 confirmation`, {
          id: 'confirmation',
          position: 'bottom-right',
          duration: 6000,
        });
      }
    })();
  }, [registerUser?.data]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setErrors({} as ZodParseErrors);
      const error = userTokenFormParse(userTokenFormData);

      if (Object.keys(error).length !== 0) {
        setErrors(error);
      } else {
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
      }
    } catch (error) {
      // console.log(error);
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
