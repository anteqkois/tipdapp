import { useLocalStorage, useUser } from '@/hooks';
import { useQoistipSign } from '@/hooks/useQoistipSign';
import { userTokenSchemaForm } from '@/schema/userTokenSchema.js';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';
import { ZodError } from 'zod';
import { Button, Card, Input } from '../utils';

const validate = (values) => {
  const errors = {};

  try {
    userTokenSchemaForm.parse(values);
  } catch (error) {
    if (error instanceof ZodError) {
      error.issues.forEach((zodError) => {
        // console.log(zodError.path[0]);
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

export const CreateUserToken = () => {
  const [errors, setErrors] = useState(null);
  const [userToken, setUserToken] = useLocalStorage('userToken', initialUserToken);
  const { chain } = useNetwork();
  const {
    user: { walletAddress },
  } = useUser();

  const { registerUser } = useQoistipSign();

  // console.log(registerUser);
  // console.log(registerUser.data);
  // console.log('tokenUser', tokenUser);

  useEffect(() => {
    registerUser?.data?.wait &&
      (async () => {
        // console.log('transactionData', transactionData);
        // transactionData.wait(10);
        //       address String @id @unique @db.VarChar(42)
        // symbol  String @unique
        // name    String @unique
        // chainId Int
        // User    User[]
        await registerUser.data.wait(10);
        setUserToken(initialUserToken);

        console.log(object);
        //Give user information that token was create
        try {
          //    // address:
          // symbol: body.symbol,
          // name: body.name,
          // chainId: body.chainId,
          // User: body.walletAddress,
          // const res = await create({symbol: token.});
          // console.log(res);
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
        registerUser.write({ recklesslySetUnpreparedArgs: [userToken.symbol, userToken.name] });
        // setUserToken(initialUserToken);
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
            value={userToken.name}
            error={errors?.name}
          />
          <Input
            id="symbol"
            name="symbol"
            label="Token symbol"
            type="text"
            onChange={handleChange}
            value={userToken.symbol}
            error={errors?.symbol}
          />
        </div>
        <p className="hover:cursor-pointer">
          <InformationCircleIcon className="icon-action" /> More information about token (Decimals, Owner, Total Supply etc.)
        </p>
        <Button className="mt-3" type="submit">
          Save
        </Button>
        <Button className="mt-3 ml-3" onClick={resetForm} option="alert">
          Reset from
        </Button>
      </form>
    </Card>
  );
  // const formik = useFormik({
  //   initialValues: token,
  //   initialStatus: 'idle',
  //   validate,
  //   validateOnChange: false,
  //   onSubmit: async (values) => {
  //     try {
  //       console.log('register');
  //       setToken(values);
  //       registerUser.write({ recklesslySetUnpreparedArgs: [token.tokenSymbol, token.tokenName] });
  //       formik.resetForm();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  // });

  // useEffect(() => {
  //   console.log(formik);
  //   token?.tokenName !== '' &&
  //     formik.status !== 'seeded' &&
  //     (() => {
  //       console.log('seeding');
  //       console.log(token);
  //       formik.setStatus('seeded');
  //       formik.setValues(token);
  //     })();
  // }, [token]);

  // return (
  //   <Card>
  //     <form onSubmit={formik.handleSubmit}>
  //       <h4>You don't have your own token yet. Create it below.</h4>
  //       <div>
  //         <Input
  //           id="tokenName"
  //           name="tokenName"
  //           label="Token name"
  //           type="text"
  //           onChange={formik.handleChange}
  //           value={formik.values.tokenName}
  //           error={formik.errors.tokenName}
  //         />
  //         <Input
  //           id="tokenSymbol"
  //           name="tokenSymbol"
  //           label="Token symbol"
  //           type="text"
  //           onChange={formik.handleChange}
  //           value={formik.values.tokenSymbol}
  //           error={formik.errors.tokenSymbol}
  //         />
  //       </div>
  //       <p className="hover:cursor-pointer">
  //         <InformationCircleIcon className="icon-action" /> More information about token (Decimals, Owner, Total Supply etc.)
  //       </p>
  //       <Button className="mt-3" type="submit">
  //         Save
  //       </Button>
  //       <Button className="mt-3 ml-3" onClick={formik.resetForm} option="alert">
  //         Reset from
  //       </Button>
  //     </form>
  //   </Card>
  // );
};
