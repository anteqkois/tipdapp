import { useClipboard } from '@/shared/hooks';
import {
  errorToast,
  transactionToast,
  waitToast,
} from '@/shared/ui/customToasts';
import { useUser } from '@/shared/User/hooks/useUser';
import { ethereum } from '@/utils/constants';
import { selectWeb3Error } from '@/utils/selectWeb3Error';
import { Hash } from '@wagmi/core';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import {
  useContract,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useProvider,
} from 'wagmi';
import { RegisterUserTransaction } from '../components/RegisterUserTransaction';
import { userFacetInstance } from '../contractInstances';
import { AvaibleChains } from '../types';
import { useConfirmationToast } from './useConfirmationToast';

export const useUserFacet = () => {
  const provider = useProvider();
  const [hashToObserve, setHashToObserve] = useState<Hash>();
  
  const { user, refreshUser } = useUser();
  const { ClipboardIcon } = useClipboard();
  const { chain } = useNetwork();
  useConfirmationToast(hashToObserve, 5);

  // USER TOKEN
  const userToken = useContractRead({
    ...userFacetInstance[chain?.name as AvaibleChains],
    functionName: 'userToken',
    args: [user!.address],
    // watch: true,
  });

  // REGISTER USER
  const { config } = usePrepareContractWrite({
    ...userFacetInstance[chain?.name as AvaibleChains],
    functionName: 'registerUser',
    args: ['', ''],
    enabled: userToken.data === ethereum.AddressZero,
  });

  const contract = useContract({
    ...userFacetInstance[chain?.name as AvaibleChains],
    signerOrProvider: provider,
  });

  const registerUser = useContractWrite({
    ...config,
    onMutate() {
      waitToast('Waiting for transaction confirmation in wallet.', {
        id: 'registerUser',
        duration: Infinity,
      });
    },
    onSettled: async (data, error: any) => {
      waitToast('Transaction was send. Wait for confirmation.', {
        id: 'registerUser',
        duration: Infinity,
      });

      if (error) {
        console.log(error);
        errorToast(selectWeb3Error(error), {
          id: 'registerUser',
          duration: Infinity,
        });
      } else if (data?.hash) {
        // console.log(data);
        setHashToObserve(data.hash);
        await data.wait(1);

        const newTokenAddress = await userToken.refetch();
        console.log(newTokenAddress);

        transactionToast(
          <RegisterUserTransaction
            hash={data.hash}
            tokenAddress={newTokenAddress.data!}
          />,
          data.hash,
          { id: 'registerUser', duration: Infinity }
        );
        (await data.wait(5)) && (await refreshUser());
      }
    },
  });

  const registerUserCall = async (symbol: string, name: string) => {
    if (registerUser?.writeAsync) {
      await registerUser.writeAsync({
        recklesslySetUnpreparedArgs: [symbol, name],
        recklesslySetUnpreparedOverrides: {
          gasLimit: await contract?.estimateGas.registerUser(symbol, name)!,
        },
      });
    } else {
    }
  };
  // console.log('registerUser', registerUser);
  return {
    contract,
    registerUser: { ...registerUser, call: registerUserCall },
    userToken,
  };
};
