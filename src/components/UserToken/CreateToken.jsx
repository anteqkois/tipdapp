import { useUser } from '@/hooks';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import api from 'src/lib/apiConfig';
import { tokenSchemaForm } from 'src/schema/tokenSchema.js';
import { useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi';
import { ZodError } from 'zod';
import QoistipSign from '../../artifacts/hardhat/QoistipSign.json';
import { Button, Card, Input } from '../utils';

const validate = (values) => {
  const errors = {};

  try {
    tokenSchemaForm.parse(values);
  } catch (error) {
    if (error instanceof ZodError) {
      error.issues.forEach((zodError) => {
        console.log(zodError.path[0]);
        errors[zodError.path[0]] = zodError.message;
      });
    }
  }

  return errors;
};

const contractInstance = {
  addressOrName: QoistipSign.address,
  contractInterface: QoistipSign.abi,
};

const tokenInit = {
  tokenSymbol: '',
  tokenName: '',
};

export const CreateToken = () => {
  const { chain } = useNetwork();
  const {
    user: { walletAddress },
  } = useUser();
  const [token, setToken] = useState(tokenInit);
  const { config, error } = usePrepareContractWrite({
    ...contractInstance,
    functionName: 'registerUser',
    args: [token.tokenSymbol, token.tokenName],
  });
  const { data: transactionData, isLoading, isSuccess, write } = useContractWrite(config);

  useEffect(() => {
    transactionData?.wait &&
      (async () => {
        console.log('error', error);
        console.log('transactionData', transactionData);
        // transactionData.wait(10);
        //       address String @id @unique @db.VarChar(42)
        // symbol  String @unique
        // name    String @unique
        // chainId Int
        // User    User[]
        transactionData.wait(10);
        try {
          const res = await api.post('/token', {
            body: {
              // address:
              symbol: token.tokenSymbol,
              name: token.tokenName,
              chainId: chain.id,
              User: walletAddress,
            },
          });
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      })();
  }, [transactionData?.wait]);

  const formik = useFormik({
    initialValues: tokenInit,
    validate,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        setToken(values);
        write();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <h4>You don't have your own token yet. Create it below.</h4>
        <div>
          <Input
            id="tokenName"
            name="tokenName"
            label="Token name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.tokenName}
            error={formik.errors.tokenName}
          />
          <Input
            id="tokenSymbol"
            name="tokenSymbol"
            label="Token symbol"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.tokenSymbol}
            error={formik.errors.tokenSymbol}
          />
        </div>
        <p className="hover:cursor-pointer">
          <InformationCircleIcon className="icon-action" /> More information about token (Decimals, Owner, Total Supply etc.)
        </p>
        <Button className="mt-3" type="submit">
          Save
        </Button>
      </form>
    </Card>
  );
};
