import { useClipboard } from '@/shared/hooks';
import { Button } from '@/shared/ui';
import { ethereum } from '@/utils/constants';
import cutAddress from '@/utils/cutAddress';
import toast from 'react-hot-toast';
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import { useUser } from '../../User/hooks/useUser';
// import { useClipboard, useUser } from '../../hooks';

const contractInstance = {
  // addressOrName: TipdappSign.address,
  // contractInterface: TipdappSign.abi,
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

  const registerUser = useContractWrite({
    ...config,
    onSuccess: async (data) => {
      await data.wait(1);
      const newTokenAddress = (await userToken.refetch()) as unknown as {
        data: string;
      };

      toast(
        (t) => (
          <div className="flex flex-col gap-3">
            <p className="flex items-center gap-1">
              After confirming with 3 blocks, you will be automatically
              redirected to the token panel.
            </p>
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
                {cutAddress(newTokenAddress.data)}
                <ClipboardIcon
                  copyData={newTokenAddress?.data}
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
                  className="font-medium text-neutral-700 mr-1"
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
    onError(error) {
      console.log(error);
    },
  });

  return { registerUser, userToken };
};
