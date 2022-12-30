import { Close, Spinner } from '@/shared/ui';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { toast, Toast } from 'react-hot-toast';

export const errorToast = (
  message: string | ((...arg: any[]) => string),
  options?:
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
    | undefined
) =>
  toast.custom(
    (t: Toast) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } grid grid-cols-[24px_auto_24px] gap-2 max-w-md p-3 bg-neutral-50 shadow-lg rounded-lg pointer-events-auto ring-1 ring-danger-600 ring-opacity-20`}
      >
        <ExclamationCircleIcon className="fill-danger-600" />
        {typeof message === 'function' ? message() : message}
        <Close onClick={() => toast.dismiss(t.id)} />
      </div>
    ),
    options
  );

export const waitToast = (
  message: string | ((...arg: any[]) => string),
  options?:
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
    | undefined
) =>
  toast.custom(
    (t: Toast) => (
      <div
        className={`${
          t.visible ? 'animate-enter ' : 'animate-leave'
        } grid grid-cols-[24px_auto_24px] items-start gap-2 max-w-md p-3 bg-neutral-50 shadow-lg rounded-lg pointer-events-auto ring-1 ring-neutral-600 ring-opacity-5`}
      >
        <Spinner className="!w-5 !h-6" />
        {typeof message === 'function' ? message() : message}
        <Close onClick={() => toast.dismiss(t.id)} />
      </div>
    ),
    options
  );

// export const errorToast = (errorMessage: string) => (t: Toast) =>
//   (
//     <div className="grid grid-cols-[24px_auto_24px] gap-2 max-w-md p-3 bg-neutral-50 shadow-lg rounded-lg pointer-events-auto ring-1 ring-danger-600 ring-opacity-20">
//       {/* <ExclamationCircleIcon className="bg-transparent stroke-2 icon stroke-danger-600" /> */}
//       <ExclamationCircleIcon className="fill-danger-600" />
//       {errorMessage}
//       <Close onClick={() => toast.dismiss(t.id)} />
//     </div>
//   );
