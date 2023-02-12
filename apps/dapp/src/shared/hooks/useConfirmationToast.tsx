import { Hash } from '@wagmi/core';
import { useEffect, useMemo } from 'react';
import { useBlockNumber, useTransaction, useWaitForTransaction } from 'wagmi';
import { confirmationToast } from '../ui';

export const useConfirmationToast = (hash?: Hash, confirmations = 4) => {
  const waitTx = useWaitForTransaction({
    hash,
    confirmations,
  });

  const runHooks = useMemo(
    () => !!(typeof waitTx.data === 'undefined' && hash),
    [waitTx.data, hash]
  );

  const transaction = useTransaction({
    hash,
    enabled: runHooks,
  });

  useBlockNumber({
    onBlock() {
      transaction.refetch();
    },
    enabled: runHooks,
  });

  // TODO give user information that UUI stop watching confirmations amount
  useEffect(() => {
    transaction.data?.confirmations &&
      confirmationToast(transaction.data.confirmations, {
        duration: 5000,
      });
  }, [transaction.data?.confirmations]);

  return transaction;
};
