import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const fulfilledDefault = (message: string) => {
  toast.success(message);
};
const rejectedDefault = () => {
  toast.success("Something went wrong, data wasn't copy.");
};

type copyArg = {
  copyData: string;
  message: string;
};

const useClipboard = (messageFromHook = 'Data copied') => {
  const copy = ({ copyData, message }: copyArg) => {
    navigator.clipboard.writeText(copyData).then(
      () => {
        fulfilledDefault(message || messageFromHook);
      },
      () => {
        rejectedDefault();
      }
    );
  };

  const ClipboardIcon = ({ copyData, message }: copyArg) => {
    return (
      <DocumentDuplicateIcon
        tabIndex={0}
        className="inline p-0.5 pb-1 pl-1 bg-neutral-150 stroke-neutral-500 w-6 rounded-full state-focus animate-action hover:stroke-neutral-800"
        onClick={() => copy({ copyData, message })}
        onKeyDown={(key) => key.code === 'Enter' && copy({ copyData, message })}
      />
    );
  };

  return { ClipboardIcon, copy };
};

export { useClipboard };
