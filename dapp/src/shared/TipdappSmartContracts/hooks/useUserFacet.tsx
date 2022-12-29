import { useClipboard } from '@/shared/hooks';
import { useUser } from '@/shared/User/hooks/useUser';
import { ethereum } from '@/utils/constants';
import { address, UserFacetAbi } from '@tipdapp/contracts';
import { useMemo } from 'react';
import { useContractRead, useNetwork, usePrepareContractWrite } from 'wagmi';
import { AvaibleChains } from '../types';
// import { useClipboard, useUser } from '../../hooks';
// console.log(Diamond)
// const contractInstance = {
//   address: Diamond,
//   abi: UserFacetAbi,
// } as any;


export const useTipdappSign = () => {
  const { user } = useUser();

  const { ClipboardIcon } = useClipboard();
  const { chain } = useNetwork();

  const contractInstance = useMemo(
    () => ({
      address: address[chain?.name as AvaibleChains].Diamond,
      abi: UserFacetAbi,
    }),
    [chain]
  );



  // const ABI = UserFacetAbi as Readonly<typeof UserFacetAbi>
  const ABI = UserFacetAbi as Readonly<typeof UserFacetAbi>;

  const userToken = useContractRead({
    // ...contractInstance,
    address: address[chain?.name as AvaibleChains].Diamond,
    abi: UserFacetAbi,
    functionName: '',
    args: [user?.address],
  });

  // WRITE
  const { config } = usePrepareContractWrite({
    ...contractInstance,
    functionName: 'registerUser',
    args: ['', ''],
    enabled: userToken?.data
      ? (userToken.data as unknown as string) === ethereum.AddressZero
      : false,
  });

  // const registerUser = useContractWrite({
  //   ...config,
  //   onSuccess: async (data) => {
  //     await data.wait(1);
  //     const newTokenAddress = (await userToken.refetch()) as unknown as {
  //       data: string;
  //     };

  //     toast(
  //       (t) => (
  //         <div className="flex flex-col gap-3">
  //           <p className="flex items-center gap-1">
  //             After confirming with 3 blocks, you will be automatically
  //             redirected to the token panel.
  //           </p>
  //           <div>
  //             <p className="flex items-center gap-1">
  //               <span className="font-medium ">Transaction Hash: </span>
  //               {cutAddress(data.hash)}
  //               <ClipboardIcon
  //                 copyData={data.hash}
  //                 message="Transaction hash copied !"
  //               />
  //             </p>
  //             <p className="flex items-center gap-1">
  //               <span className="font-medium ">Token address: </span>
  //               {cutAddress(newTokenAddress.data)}
  //               <ClipboardIcon
  //                 copyData={newTokenAddress?.data}
  //                 message="Address copied !"
  //               />
  //             </p>
  //           </div>
  //           <div className="flex justify-between">
  //             <a
  //               tabIndex={-1}
  //               href={`https://etherscan.io/token/${newTokenAddress.data}`}
  //               target="_blank"
  //               rel="noreferrer"
  //             >
  //               <Button
  //                 variant="link"
  //                 className="mr-1 font-medium text-neutral-700"
  //               >
  //                 View token on Explorer
  //               </Button>
  //             </a>
  //             <Button
  //               onClick={() => toast.dismiss(t.id)}
  //               variant="minimalist"
  //             >
  //               Close
  //             </Button>
  //           </div>
  //         </div>
  //       ),
  //       { duration: Infinity, id: 'registerUserToats' }
  //     );
  //   },
  //   onError(error) {
  //     console.log(error);
  //   },
  // });

  return { registerUser, userToken };
};
