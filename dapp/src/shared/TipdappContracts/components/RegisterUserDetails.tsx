import { useClipboard } from '@/shared/hooks';
import cutAddress from '@/utils/cutAddress';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Address, Hash } from '@wagmi/core';

type Props = { hash: Hash; tokenAddress: Address };

export const RegisterUserDetails = ({ hash, tokenAddress }: Props) => {
  const { ClipboardIcon } = useClipboard();
  return (
    <div className="flex flex-col gap-3">
      <h6 className="flex items-center gap-1">
        <CheckCircleIcon className="h-6 fill-primary-700" /> Token
        was successfully created !
      </h6>
      <div className="pl-1">
        <p className="flex items-center gap-1">
          <span className="font-medium ">Transaction Hash: </span>
          {cutAddress(hash)}
          <ClipboardIcon
            copyData={hash}
            message="Transaction hash copied !"
          />
        </p>
        <p className="flex items-center gap-1 truncate">
          <span className="font-medium ">Token address: </span>
          {cutAddress(tokenAddress)}
          <ClipboardIcon
            copyData={tokenAddress}
            message="Address copied !"
          />
        </p>
      </div>
      <p className="pl-1">
        After confirming with 2 blocks, you will be automatically redirected to
        the token panel.
      </p>
    </div>
  );
};
