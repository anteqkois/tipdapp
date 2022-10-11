import { useLocalStorage, useUser } from '@/hooks';
import { useQoistipSign } from '@/hooks/useQoistipSign';
import { userTokenSchemaForm } from '@/schema/userTokenSchema.js';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNetwork } from 'wagmi';
import { ZodError } from 'zod';
import { Button, Card, Input } from '../utils';
import { Details } from '../utils/Details';

const validate = (values) => {
  const errors = {};

  try {
    userTokenSchemaForm.parse(values);
  } catch (error) {
    if (error instanceof ZodError) {
      error.issues.forEach((zodError) => {
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

export const CreateUserToken = ({ setToken }) => {
  const [errors, setErrors] = useState(null);
  const [showMoreInformation, setShowMoreInformation] = useState(false);
  const [userToken, setUserToken] = useLocalStorage(
    'userToken',
    initialUserToken
  );
  const { chain } = useNetwork();
  const {
    user: { address },
  } = useUser();

  const { registerUser } = useQoistipSign();

  useEffect(() => {
    registerUser?.data?.wait &&
      (async () => {
        await registerUser.data.wait(1);
        toast.success(`Transaction have 1 confirmation`, {
          id: 'confirmation',
          position: 'bottom-right',
          duration: 6000,
        });
        await registerUser.data.wait(2);
        toast.success(`Transaction have 2 confirmation`, {
          id: 'confirmation',
          position: 'bottom-right',
          duration: 6000,
        });
        await registerUser.data.wait(3);
        toast.success(`Transaction have 3 confirmation`, {
          id: 'confirmation',
          position: 'bottom-right',
          duration: 6000,
        });
        setUserToken(initialUserToken);
        setToken({ created: true });
        try {
        } catch (error) {
          console.log(error);
        }
      })();
  }, [registerUser?.data]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors(null);
      const error = validate(userToken);

      if (!Object.keys(error).length) {
        // console.log(registerUser);
        // registerUser.write({ recklesslySetUnpreparedArgs: [userToken.symbol, userToken.name] });

        // console.log(writePromise.);
        const writePromise = registerUser.writeAsync({
          recklesslySetUnpreparedArgs: [userToken.symbol, userToken.name],
        });
        toast.promise(
          writePromise,
          {
            loading: 'Wait for send transaction',
            success: 'Your token was succesfully create!',
            error: 'Something went wrong, we can not create your token.',
          }
          // { duration: 5000 },
        );
      } else {
        setErrors(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUserToken((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const resetForm = () => {
    setUserToken(initialUserToken);
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
            value={userToken.name ?? ''}
            error={errors?.name}
          />
          <Input
            id="symbol"
            name="symbol"
            label="Token symbol"
            type="text"
            onChange={handleChange}
            value={userToken.symbol ?? ''}
            error={errors?.symbol}
          />
        </div>
        <Button type="submit">Save</Button>
        <Button
          className="ml-3"
          onClick={resetForm}
          type="reset"
          option="alert"
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
