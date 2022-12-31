import { Hash } from '@wagmi/core';
import { useWaitForTransaction } from 'wagmi';

export const useConfirmation = (hash?: Hash, confirmations?: number) => {
  // const { data, isError, isLoading } = useWaitForTransaction({
  const txData = useWaitForTransaction({
    hash,
    confirmations,
  });

  

  return txData;
};
