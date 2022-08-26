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
    // setValue(copyData);
    copy(copyData, message);
  };

  const ClipboardIcon = ({ copyData, message }) => {
    return (
      <DocumentDuplicateIcon
        tabIndex="0"
        className="inline p-0.5 pb-1 pl-1 bg-neutral-200 stroke-neutral-500 w-6 rounded-full state-focus animate-action hover:stroke-neutral-800"
        onClick={() => handleCopy({ copyData, message })}
        onKeyDown={(key) => key.code === 'Enter' && handleCopy({ copyData, message })}
      />
    );
  };

  return { ClipboardIcon, handleCopy };
};

export default useClipboard;

// const CopyToClipboard = ({ copyData }) => {
//   const [copy, setValue] = useClipboard(copyData);

//   //TODO give user info that they copy, use toast !

//   const handleCopy = () => {
//     setValue(copyData);
//     copy();
//   };

//   const ClipboardIcon = () => {
//     return (
//       <svg
//         onClick={handleCopy}
//         className="fill-neutral-500 w-5 h-5 mx-1 -mt-1 inline cursor-pointer hover:fill-neutral-800"
//         viewBox="0 0 24 24"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <g strokeWidth="0.4" fillRule="evenodd">
//           <g fillRule="nonzero">
//             <path d="M20.4961766,5.62668182 C21.3720675,5.93447702 22,6.76890777 22,7.75 L22,17.75 C22,20.0972102 20.0972102,22 17.75,22 L7.75,22 C6.76890777,22 5.93447702,21.3720675 5.62668182,20.4961766 L7.72396188,20.4995565 L17.75,20.5 C19.2687831,20.5 20.5,19.2687831 20.5,17.75 L20.5,7.75 L20.4960194,7.69901943 L20.4961766,5.62668182 Z M17.246813,2 C18.4894537,2 19.496813,3.00735931 19.496813,4.25 L19.496813,17.246813 C19.496813,18.4894537 18.4894537,19.496813 17.246813,19.496813 L4.25,19.496813 C3.00735931,19.496813 2,18.4894537 2,17.246813 L2,4.25 C2,3.00735931 3.00735931,2 4.25,2 L17.246813,2 Z M17.246813,3.5 L4.25,3.5 C3.83578644,3.5 3.5,3.83578644 3.5,4.25 L3.5,17.246813 C3.5,17.6610266 3.83578644,17.996813 4.25,17.996813 L17.246813,17.996813 C17.6610266,17.996813 17.996813,17.6610266 17.996813,17.246813 L17.996813,4.25 C17.996813,3.83578644 17.6610266,3.5 17.246813,3.5 Z M10.75,6.75 C11.1642136,6.75 11.5,7.08578644 11.5,7.5 L11.5,10 L14,10 C14.4142136,10 14.75,10.3357864 14.75,10.75 C14.75,11.1642136 14.4142136,11.5 14,11.5 L11.5,11.5 L11.5,14 C11.5,14.4142136 11.1642136,14.75 10.75,14.75 C10.3357864,14.75 10,14.4142136 10,14 L10,11.5 L7.5,11.5 C7.08578644,11.5 6.75,11.1642136 6.75,10.75 C6.75,10.3357864 7.08578644,10 7.5,10 L10,10 L10,7.5 C10,7.08578644 10.3357864,6.75 10.75,6.75 Z"></path>
//           </g>
//         </g>
//       </svg>
//     );
//   };

//   return { ClipboardIcon, copy, message };
// };

// export default CopyToClipboard;
