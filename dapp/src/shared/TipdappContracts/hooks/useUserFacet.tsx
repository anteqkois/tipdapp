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
import { useState } from 'react';
import {
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi';
import { RegisterUserTransaction } from '../components/RegisterUserTransaction';
import { userFacetInstance } from '../contractInstances';
import { AvaibleChains } from '../types';
import { useConfirmationToast } from './useConfirmationToast';

export const useUserFacet = () => {
  const { user } = useUser();

  const { ClipboardIcon } = useClipboard();
  const { chain } = useNetwork();

  const [hashToObserve, setHashToObserve] = useState<Hash | undefined>(
    '0x32a4a88776a805a34914591d77df16b4d060d7f1d33917ace6358f79ec139f96'
  );
  // useConfirmation(hashToObserve);
  // setHashToObserve(
  //   '0xe3c75b437c68ed0af0387426fa924209195a1cc2fd60265c6b717a62e3fc0394'
  // );
  useConfirmationToast(hashToObserve, 5);

  const userToken = useContractRead({
    ...userFacetInstance[chain?.name as AvaibleChains],
    functionName: 'userToken',
    args: [user!.address],
    watch: true,
  });

  // console.log(userToken);

  // WRITE
  const { config } = usePrepareContractWrite({
    ...userFacetInstance[chain?.name as AvaibleChains],
    functionName: 'registerUser',
    args: ['', ''],
    enabled: userToken.data === ethereum.AddressZero,
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
        errorToast(selectWeb3Error(error), {
          id: 'registerUser',
          duration: Infinity,
        });
      } else if (data?.hash) {
        setHashToObserve(data.hash);
        const newTokenAddress = await userToken.refetch();
        // TODO refresh userSession when token was created

        transactionToast(
          <RegisterUserTransaction
            hash={data.hash}
            tokenAddress={newTokenAddress.data!}
          />,
          data.hash,
          { id: 'registerUser', duration: Infinity }
        );
        await data.wait(5) && 
      }
    },
  });
  return { registerUser, userToken };
};
