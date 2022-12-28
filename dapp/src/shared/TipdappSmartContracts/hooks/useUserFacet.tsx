import { useClipboard } from '@/shared/hooks';
import { useUser } from '@/shared/User/hooks/useUser';
import { ethereum } from '@/utils/constants';
import { UserFacetAbi } from '@tipdapp/contracts';
import {
  useContractRead, usePrepareContractWrite
} from 'wagmi';
// import { useClipboard, useUser } from '../../hooks';
console.log(Diamond)
const contractInstance = {
  address: Diamond,
  abi: UserFacetAbi,
} as any;

export const useTipdappSign = () => {
  const { user } = useUser();

  const { ClipboardIcon } = useClipboard();

  // READ
  const userToken = useContractRead({
    ...contractInstance,
    functionName: 'userToken',
    args: user?.address,
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
