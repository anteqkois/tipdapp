import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const fulfilledDefault = (message) => {
  toast.success(message ? message : 'Data copied');
};
const rejectedDefault = () => {
  toast.success("Something went wrong, data wasn't copy.");
};

const useClipboard = (copyData) => {
  const copy = (copyData, message) => {
    navigator.clipboard.writeText(copyData).then(
      () => {
        fulfilledDefault(message);
      },
      () => {
        rejectedDefault();
      },
    );
  };

  const handleCopy = ({ copyData, message }) => {
    copy(copyData, message);
  };

  const ClipboardIcon = ({ copyData, message }) => {
    return (
      <DocumentDuplicateIcon
        tabIndex="0"
        className="inline p-0.5 pb-1 pl-1 bg-neutral-150 stroke-neutral-500 w-6 rounded-full state-focus animate-action hover:stroke-neutral-800"
        onClick={() => handleCopy({ copyData, message })}
        onKeyDown={(key) => key.code === 'Enter' && handleCopy({ copyData, message })}
      />
    );
  };

  return { ClipboardIcon, handleCopy };
};

export default useClipboard;