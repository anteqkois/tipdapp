import { Hash } from '@wagmi/core';
import { ReactNode } from 'react';
import { toast } from 'react-hot-toast';
import { ViewOnExplorer } from './ViewOnExplorer';

type Props = { children: ReactNode; hash: Hash; toastId: string };

export const TransactionToast = ({ children, toastId, hash }: Props) => {
  return (
    <div className="flex flex-col gap-3 ">
      <div className="p-3">{children}</div>
      <div className="flex border-t text-center border-primary-600 border-opacity-20 [&>*]:flex-auto [&>*]:p-3">
        <ViewOnExplorer
          classNames="flex justify-center"
          subject="tx"
          value={hash}
        />
        <span className="max-w-[1px] !p-0 bg-purple-600 opacity-20" />
        <button onClick={() => toast.dismiss(toastId)}>Close</button>
      </div>
    </div>
  );
};
