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
  const { user, refreshUser } = useUser();
  const provider = useProvider();

  const { ClipboardIcon } = useClipboard();
  const { chain } = useNetwork();

  const [hashToObserve, setHashToObserve] = useState<Hash>();

  useConfirmationToast(hashToObserve, 5);

  // USER TOKEN
  const userToken = useContractRead({
    ...userFacetInstance[chain?.name as AvaibleChains],
    functionName: 'userToken',
    args: [user!.address],
    // watch: true,
  });

  // console.log(userToken.data);

  // REGISTER USER
  const { config } = usePrepareContractWrite({
    ...userFacetInstance[chain?.name as AvaibleChains],
    functionName: 'registerUser',
    args: ['', ''],
    overrides: {
      // gasLimit: ethers.utils.parseUnits('169326', 'wei'),
      // value: ethers.utils.parseEther('0.01'),
    },
    enabled: userToken.data === ethereum.AddressZero,
  });

  const contract = useContract({
    ...userFacetInstance[chain?.name as AvaibleChains],
    signerOrProvider: provider,
  });

  useEffect(() => {
    (async () => {
      //0.000000000000171959
      // const res = await contract?.estimateGas.registerUser(
      //   'ANQsdasd',
      //   'Anteqkasdasdois'
      // );
      console.log(
        ethers.utils.formatUnits(
          await contract?.estimateGas.registerUser(
            'ANQsdasd',
            'Anteqkasdasdois'
          )!,
          'wei'
        )
      );
    })();
  }, []);

  // console.log(
  //   provider.estimateGas({
  //     // Wrapped ETH address
  //     to: userFacetInstance[chain?.name as AvaibleChains].address,

  //     // `function deposit() payable`
  //     data: '0xd0e30db0',

  //     // 1 ether
  //     // value: parseEther('1.0'),
  //   })
  // );

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
        console.log(data);
        setHashToObserve(data.hash);
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
  // console.log('registerUser', registerUser);
  return { contract, registerUser, userToken };
};
