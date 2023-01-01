import { confirmationToast } from '@/shared/ui/customToasts';
import { Hash } from '@wagmi/core';
import { useEffect, useMemo } from 'react';
import { useBlockNumber, useTransaction, useWaitForTransaction } from 'wagmi';

export const useConfirmationToast = (hash?: Hash, confirmations = 4) => {
  const waitTx = useWaitForTransaction({
    hash,
    confirmations,
  });

  const run = useMemo(() => {
    return typeof waitTx.data === 'undefined' && hash ? true : false;
  }, [waitTx.data, hash]);

  const transaction = useTransaction({
    hash,
    enabled: run,
    // enabled: typeof waitTx.data === 'undefined',
    // enabled: !!!waitTx.data,
  });
  console.log(run);

  const blockNumber = useBlockNumber({
    onBlock(blockNumber) {
      console.log('New block: ', blockNumber);
      transaction.refetch();
    },
    enabled: run,
    // enabled: typeof waitTx.data === 'undefined',
    // enabled: !!!waitTx.data,
  });

  //TODO give user information that UUI stop watching confirmations amount
  useEffect(() => {
    transaction.data?.confirmations &&
      confirmationToast(transaction.data.confirmations, {
        duration: 5000,
      });
  }, [transaction.data?.confirmations]);

  return transaction;
};
