import { errorToast, waitToast } from '@/lib/toastCustom';
import { useClipboard } from '@/shared/hooks';
import { Button } from '@/shared/ui';
import { useUser } from '@/shared/User/hooks/useUser';
import { ethereum } from '@/utils/constants';
import cutAddress from '@/utils/cutAddress';
import { toast } from 'react-hot-toast';
import {
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi';
import { WEB_3_CONFIG } from '../config';
import { userFacetInstance } from '../contractInstances';
import { AvaibleChains } from '../types';

export const useUserFacet = () => {
  const { user } = useUser();

  const { ClipboardIcon } = useClipboard();
  const { chain } = useNetwork();

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
    // enabled: userToken?.data
    //   ? (userToken.data as unknown as string) === ethereum.AddressZero
    //   : false,
  });

  const registerUser = useContractWrite({
    ...config,
    onSuccess: async (data) => {
      await data.wait(WEB_3_CONFIG.SECURE_CONFIRMATIONS_AMOUNT);
      // const newTokenAddress = (await userToken.refetch()) as unknown as {
      //   data: string;
      // };
      const newTokenAddress = await userToken.refetch();
      newTokenAddress.data;

      toast(
        (t) => (
          <div className="flex flex-col gap-3">
            {/* <p className="flex items-center gap-1">
              After confirming with 3 blocks, you will be automatically
              redirected to the token panel.
            </p> */}
            <div>
              <p className="flex items-center gap-1">
                <span className="font-medium ">Transaction Hash: </span>
                {cutAddress(data.hash)}
                <ClipboardIcon
                  copyData={data.hash}
                  message="Transaction hash copied !"
                />
              </p>
              <p className="flex items-center gap-1">
                <span className="font-medium ">Token address: </span>
                {cutAddress(newTokenAddress.data!)}
                <ClipboardIcon
                  copyData={newTokenAddress.data!}
                  message="Address copied !"
                />
              </p>
            </div>
            <div className="flex justify-between">
              <a
                tabIndex={-1}
                href={`https://etherscan.io/token/${newTokenAddress.data}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  variant="link"
                  className="mr-1 font-medium text-neutral-700"
                >
                  View token on Explorer
                </Button>
              </a>
              <Button
                onClick={() => toast.dismiss(t.id)}
                variant="minimalist"
              >
                Close
              </Button>
            </div>
          </div>
        ),
        { duration: Infinity, id: 'registerUserToats' }
      );
    },
    onMutate({ args, overrides }) {
      console.log('Mutate', { args, overrides });
      waitToast('Waiting for transaction confirmation in wallet.', {
        id: 'registerUser',
        duration: Infinity,
      });
    },
    onSettled(data, error: any) {
      waitToast('Transaction was send. Wait for confirmation.', {
        id: 'registerUser',
        duration: Infinity,
      });

      console.log('Settled', { data, error });
      if (error) {
        let errorMessage;
        switch (error.code) {
          case 4001:
            errorMessage = error.message;
            break;
          case -32603:
            //TODO you must use regex to get exacly error message
            errorMessage = error.message;
            break;

          default:
            errorMessage = error.reason;
            break;
        }
        errorToast(errorMessage, { id: 'registerUser', duration: Infinity });
      } else {
        console.log(data);
      }
    },
  });
  // console.log(registerUser);

  return { registerUser, userToken };
};
