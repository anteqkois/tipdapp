import { errorToast } from '@/lib/toastCustom';
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

  console.log(userToken);

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
    onError(error: any) {
      errorToast(error.reason, { duration: Infinity });
    },
  });
  console.log(registerUser);

  return { registerUser, userToken };
  // return { registerUser: { ...registerUser, ready: false}, userToken };
};
