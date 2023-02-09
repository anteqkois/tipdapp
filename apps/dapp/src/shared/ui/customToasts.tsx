import { Close, Spinner } from '@/shared/ui';
import { ViewOnExplorer } from '@/shared/ui/ViewOnExplorer';
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/solid';
import { Hash } from '@wagmi/core';
import { toast, Toast } from 'react-hot-toast';

type ToastOptions =
  | Partial<
      Pick<
        Toast,
        | 'style'
        | 'className'
        | 'id'
        | 'icon'
        | 'duration'
        | 'ariaProps'
        | 'position'
        | 'iconTheme'
      >
    >
  | undefined;

const errorToast = (
  message: string | ((...arg: any[]) => string),
  options?: ToastOptions
) =>
  toast.custom(
    (t: Toast) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } grid grid-cols-[24px_auto_24px] gap-2 max-w-sm md:max-w-md p-3 bg-neutral-50 shadow-lg rounded-lg pointer-events-auto ring-1 ring-danger-600 ring-opacity-20`}
      >
        <ExclamationCircleIcon className="fill-danger-600" />
        {typeof message === 'function' ? message() : message}
        <Close onClick={() => toast.dismiss(t.id)} />
      </div>
    ),
    options
  );

const waitToast = (
  message: string | ((...arg: any[]) => string),
  options?: ToastOptions
) =>
  toast.custom(
    (t: Toast) => (
      <div
        className={`${
          t.visible ? 'animate-enter ' : 'animate-leave'
        } grid grid-cols-[24px_auto_24px] items-start gap-2 max-w-sm md:max-w-md p-3 bg-neutral-50 shadow-lg rounded-lg pointer-events-auto ring-1 ring-neutral-600 ring-opacity-5`}
      >
        <Spinner className="!w-5 !h-6" />
        {typeof message === 'function' ? message() : message}
        <Close onClick={() => toast.dismiss(t.id)} />
      </div>
    ),
    options
  );

const transactionToast = (
  message: string | ((...arg: any[]) => string | JSX.Element) | JSX.Element,
  hash: Hash,
  options?: ToastOptions
) =>
  toast.custom(
    (t: Toast) => (
      <div
        className={`${
          t.visible ? 'animate-enter ' : 'animate-leave'
        } gap-2 max-w-sm md:max-w-md bg-neutral-50 shadow-lg rounded-lg pointer-events-auto ring-1 ring-primary-600 ring-opacity-20`}
      >
        <div className="flex flex-col gap-3 ">
          <div className="p-3">
            {typeof message === 'function' ? message() : message}
          </div>
          <div className="flex border-t text-center border-primary-600 border-opacity-20 [&>*]:flex-auto [&>*]:p-3 [&>*]:justify-center">
            <ViewOnExplorer
              subject="tx"
              value={hash}
            />
            <span className="max-w-[1px] !p-0 bg-purple-600 opacity-20" />
            <button onClick={() => toast.dismiss(t.id)}>Close</button>
          </div>
        </div>
      </div>
    ),
    options
  );

const confirmationToast = (
  // tx: Hash,
  confirmation: number,
  options?: ToastOptions
) => {
  toast.custom(
    (t: Toast) => (
      <div
        className={`${
          t.visible ? 'animate-enter ' : 'animate-leave'
        } flex items-center gap-2 max-w-sm md:max-w-md p-3 bg-neutral-50 shadow-lg rounded-lg pointer-events-auto ring-1 ring-neutral-600 ring-opacity-5`}
      >
        <CheckBadgeIcon className="h-6 fill-success-600" />
        Transaction have {confirmation} confirmation!
        <Close onClick={() => toast.dismiss(t.id)} />
      </div>
    ),
    { id: 'confirmation', ...options }
  );
};

export { confirmationToast, transactionToast, waitToast, errorToast };
