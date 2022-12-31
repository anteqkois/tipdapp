import { useLocalStorage } from '@/shared/hooks';
import { RegisterUserTransaction } from '@/shared/TipdappContracts/components/RegisterUserTransaction';
import { useUserFacet } from '@/shared/TipdappContracts/hooks/useUserFacet';
import { Button, Card, Details, Input } from '@/shared/ui';
import { transactionToast } from '@/shared/ui/customToasts';
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

  const { registerUser, userToken } = useUserFacet();

  // useEffect(() => {
  //   (async () => {
  //     if (registerUser?.data?.wait) {
  //       await registerUser.data?.wait(1);
  //       toast.success(`Transaction have 1 confirmation`, {
  //         id: 'confirmation',
  //         position: 'bottom-right',
  //         duration: 6000,
  //       });
  //       await registerUser.data?.wait(2);
  //       toast.success(`Transaction have 2 confirmation`, {
  //         id: 'confirmation',
  //         position: 'bottom-right',
  //         duration: 6000,
  //       });

  //       setUserTokenFormData(initialUserToken);
  //       // await refreshSessionData();

  //       await registerUser.data?.wait(3);
  //       toast.success(`Transaction have 3 confirmation`, {
  //         id: 'confirmation',
  //         position: 'bottom-right',
  //         duration: 6000,
  //       });
  //     }
  //   })();
  // }, [registerUser?.data]);

  // toast.custom(
  //   <RegisterUserDetails
  //     hash={'0x123457893459178wefjkl'}
  //     toastId="registerUser"
  //     tokenAddress={'0x12345789345917812e892d3bhjk23rwefjkl'}
  //   />,
  //   { duration: Infinity }
  // );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setErrors({});

      userTokenValidation.createFormParse(userTokenFormData);

      if (registerUser?.writeAsync) {
        await registerUser.writeAsync({
          recklesslySetUnpreparedArgs: [
            userTokenFormData.symbol,
            userTokenFormData.name,
          ],
        });
        // const writePromise = registerUser.writeAsync({
        //   recklesslySetUnpreparedArgs: [
        //     userTokenFormData.symbol,
        //     userTokenFormData.name,
        //   ],
        // });
        // toast.promise(
        //   writePromise,
        //   {
        //     loading: 'Wait for send transaction',
        //     success: 'Your token was succesfully create!',
        //     error: 'Something went wrong, we can not create your token.',
        //   },
        //   { id: 'registerUserPromise' }
        // );
      } else {
        // toast.error('Something went wrong, we can not create your token.', {
        //   id: 'registerUserPromise',
        // });
      }
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
