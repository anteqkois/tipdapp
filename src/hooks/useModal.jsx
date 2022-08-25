import { useEffect, useState } from 'react';
import Button from '@/components/utils/Button';
import { XIcon } from '@heroicons/react/outline';
import * as Dialog from '@radix-ui/react-dialog';

export const ModalProvider = () => <div id="modal" />;

const useModal = () => {
  const [showModal, setShowModal] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const Modal = ({ children, title, description, openButtonText, openJSX, onClose = () => {} }) => {
    const handleClose = () => {
      onClose();
      setShowModal(false);
    };

    return mounted ? (
      <Dialog.Root open={showModal} onOpenChange={setShowModal} modal={true}>
        <Dialog.Trigger asChild>{openJSX ? openJSX : <Button>{openButtonText}</Button>}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 p-2 bg-neutral-800/40" forceMount />
          <Dialog.Content
            className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-50 w-full max-w-md p-4 overflow-hidden text-left align-middle transition-all transform rounded-lg shadow-md bg-neutral-50"
            forceMount
          >
            <div className="flex justify-between mb-4">
              <Dialog.Title className="text-lg font-medium underline decoration-2 decoration-primary-600">{title}</Dialog.Title>
              <Dialog.Close className="rounded-full state-focus w-6 h-6">
                <XIcon className="p-1 ease-in-out rounded-full bg-neutral-150 w-6 h-6 stroke-neutral-600 animate-action" />
              </Dialog.Close>
            </div>
            <Dialog.Description className="text-sm">{description}</Dialog.Description>
            {children}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    ) : null;
  };

  //   return (
  //     <Transition appear show={showModal} as={Fragment}>
  //       <Dialog as="div" className="relative z-50" onClose={handleClose}>
  //         <div className="fixed inset-0 p-2 overflow-y-auto flex-center bg-neutral-800/40">
  //           <div className="flex items-center justify-center min-h-full p-4 text-center">
  //             <Transition.Child
  //               as={Fragment}
  //               enter="ease-out duration-300"
  //               enterFrom="opacity-0 scale-95"
  //               enterTo="opacity-100 scale-100"
  //               leave="ease-in duration-200"
  //               leaveFrom="opacity-100 scale-100"
  //               leaveTo="opacity-0 scale-95"
  //             >
  //               <Dialog.Panel className="w-full max-w-md p-4 overflow-hidden text-left align-middle transition-all transform rounded-lg shadow-md bg-neutral-50">
  //                 <Dialog.Title as="h4" className="mb-4 text-lg font-medium underline decoration-2 decoration-primary-600">
  //                   Payment successful
  //                 </Dialog.Title>
  //                 {children}
  //               </Dialog.Panel>
  //             </Transition.Child>
  //           </div>
  //         </div>
  //       </Dialog>
  //     </Transition>
  //   );
  // };

  //   return mounted && showModal
  //     ? createPortal(
  //         <div className="fixed inset-0 z-40 p-2 flex-center bg-neutral-800/40 " onClick={() => setShowModal(false)}>
  //           <Card
  //             className="w-fit max-w-[100%] break-word ring-1 ring-neutral-900 ring-opacity-5 z-50 lg:max-w-2xl animate-enter"
  //             onClick={(e) => e.stopPropagation()}
  //           >
  //             <div className="flex justify-between mb-4">
  //               <h5 className="underline decoration-2 decoration-primary-600">{title}</h5>
  //               <XIcon className="p-1 ease-in-out rounded-full bg-neutral-300 w-7 h-7 stroke-neutral-600 animate-action" />
  //             </div>
  //             {children}
  //           </Card>
  //         </div>,
  //         document.getElementById('modal'),
  //       )
  //     : null;
  // };

  return [setShowModal, Modal];
};
export default useModal;
