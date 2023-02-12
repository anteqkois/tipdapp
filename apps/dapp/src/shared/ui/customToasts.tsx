import { ViewOnExplorer } from '@/shared/ui/ViewOnExplorer';
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/solid';
import { Hash } from '@wagmi/core';
import { toast, Toast } from 'react-hot-toast';
import { Close } from './Close';
import { Spinner } from './Spinner';

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
        } pointer-events-auto grid max-w-sm grid-cols-[24px_auto_24px] gap-2 rounded-lg bg-neutral-50 p-3 shadow-lg ring-1 ring-danger-600 ring-opacity-20 md:max-w-md`}
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
        } pointer-events-auto grid max-w-sm grid-cols-[24px_auto_24px] items-start gap-2 rounded-lg bg-neutral-50 p-3 shadow-lg ring-1 ring-neutral-600 ring-opacity-5 md:max-w-md`}
      >
        <Spinner className="!h-6 !w-5" />
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
        } pointer-events-auto max-w-sm gap-2 rounded-lg bg-neutral-50 shadow-lg ring-1 ring-primary-600 ring-opacity-20 md:max-w-md`}
      >
        <div className="flex flex-col gap-3 ">
          <div className="p-3">
            {typeof message === 'function' ? message() : message}
          </div>
          <div className="flex border-t border-primary-600 border-opacity-20 text-center [&>*]:flex-auto [&>*]:justify-center [&>*]:p-3">
            <ViewOnExplorer
              subject="tx"
              value={hash}
            />
            <span className="max-w-[1px] bg-purple-600 !p-0 opacity-20" />
            <button
              type="button"
              onClick={() => toast.dismiss(t.id)}
            >
              Close
            </button>
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
        } pointer-events-auto flex max-w-sm items-center gap-2 rounded-lg bg-neutral-50 p-3 shadow-lg ring-1 ring-neutral-600 ring-opacity-5 md:max-w-md`}
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
