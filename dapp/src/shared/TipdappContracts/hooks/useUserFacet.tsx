import { errorToast, waitToast } from '@/lib/toastCustom';
import { useClipboard } from '@/shared/hooks';
import { useUser } from '@/shared/User/hooks/useUser';
import { ethereum } from '@/utils/constants';
import { selectWeb3Error } from '@/utils/selectWeb3Error';
import { Hash } from '@wagmi/core';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi';
import { RegisterUserDetails } from '../components/RegisterUserDetails';
import { userFacetInstance } from '../contractInstances';
import { AvaibleChains } from '../types';
import { useConfirmation } from './useConfirmation';

export const useUserFacet = () => {
  const { user } = useUser();

  const { ClipboardIcon } = useClipboard();
  const { chain } = useNetwork();

  const [hashToObserve, setHashToObserve] = useState<Hash | undefined>(
    undefined
  );
  useConfirmation(hashToObserve);

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
      } else {
        setHashToObserve(data?.hash);
        const newTokenAddress = await userToken.refetch();
        // TODO refresh userSession when token was created
        toast.custom(
          <RegisterUserDetails
            hash={data?.hash!}
            toastId="registerUser"
            tokenAddress={newTokenAddress.data!}
          />
        );
      }
    },
  });
  return { registerUser, userToken };
};
