import { useLocalStorage } from '@/shared/hooks';
import { useUserFacet } from '@/shared/TipdappContracts/hooks/useUserFacetContract';
import { Button, Card, Details, Input } from '@/shared/ui';
import { ValidationError } from '@tipdapp/api';
import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { z, ZodError } from 'zod';

const userTokenFormValidation = z.object({
  symbol: z
    .string()
    .min(2, { message: 'Token symbol must have 2 or more characters.' })
    .max(20, { message: 'Token symbol can be up to 10 characters long.' }),
  name: z
    .string()
    .min(1, { message: 'Token name must have 2 or more characters.' })
    .max(20, { message: 'Token name can be up to 20 characters long.' }),
});

type UserTokenForm = z.infer<typeof userTokenFormValidation>;

const initialUserToken: UserTokenForm = {
  symbol: '',
  name: '',
};

export const CreateUserToken = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [userTokenFormData, setUserTokenFormData] =
    useLocalStorage<UserTokenForm>('userTokenFormData', initialUserToken);
  // TODO Refreshh user data after create user token
  // const { refreshSessionData } = useSession();

  const { registerUser } = useUserFacet();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setErrors({});
      userTokenFormValidation.parse(userTokenFormData);
      await registerUser.call(userTokenFormData.symbol, userTokenFormData.name);
    } catch (error: any) {
      if (error instanceof ZodError) {
        const err = ValidationError.fromZodErrorArray(error.issues);
        setErrors(ValidationError.mapArrayByField(err));
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  // TODO useDebounce!!!
  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    setUserTokenFormData((prev) => ({
      ...prev,
      [e.currentTarget.id]: e.currentTarget.value,
    }));
  };

  const resetForm = () => {
    setUserTokenFormData(initialUserToken);
    setErrors({});
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
        <Button
          type="submit"
          disabled={!registerUser.write}
          // disabled={!registerUser.write || userToken.data !== ethers.constants.AddressZero}
        >
          Create token
        </Button>
        <Button
          className="ml-3"
          onClick={resetForm}
          type="reset"
          variant="danger"
        >
          Reset from
        </Button>
      </form>
      <Details
        title="More information about token (Decimals, Owner, Total Supply etc.)"
        details="Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati possimus dignissimos sequi voluptatum, omnis magni
          deleniti ducimus voluptatibus. Obcaecati similique ipsum laboriosam libero magnam modi earum voluptatibus. Delectus, in
          veritatis."
      />
    </Card>
  );
};
