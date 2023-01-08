import { useLocalStorage } from '@/shared/hooks';
import { useUserFacet } from '@/shared/TipdappContracts/hooks/useUserFacetContract';
import { Button, Card, Details, Input } from '@/shared/ui';
import { UserTokenValidation, userTokenValidation } from '@tipdapp/server';
import { FormEvent, useState } from 'react';

const initialUserToken: UserTokenValidation.CreateForm = {
  symbol: '',
  name: '',
};

export const CreateUserToken = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [userTokenFormData, setUserTokenFormData] =
    useLocalStorage<UserTokenValidation.CreateForm>(
      'userTokenFormData',
      initialUserToken
    );
  //TODO Refreshh user data after create user token
  // const { refreshSessionData } = useSession();

  const { contract, registerUser, userToken } = useUserFacet();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setErrors({});

      userTokenValidation.createFormParse(userTokenFormData);
      await registerUser.call(userTokenFormData.symbol, userTokenFormData.name);
    } catch (error: any) {
      if (error?.type === 'ValidationErrors') {
        setErrors(error.mapByField());
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
      ></Details>
    </Card>
  );
};
