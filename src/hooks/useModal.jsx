// import Card from '@/components/utils/Card';
// import { XIcon } from '@heroicons/react/outline';
import { Fragment, useEffect, useState } from 'react';
// import { createPortal } from 'react-dom';
import { Dialog, Transition } from '@headlessui/react';

export const ModalProvider = () => <div id="modal" />;

const useModal = () => {
  const [showModal, setShowModal] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const Modal = ({ children, title, className, onClose = () => {} }) => {
    const handleClose = () => {
      onClose();
      setShowModal(false);
    };

    return (
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleClose}>
          {/* <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-40 p-2 flex-center bg-neutral-800/40" />
          </Transition.Child> */}

          <div className="fixed inset-0 p-2 overflow-y-auto flex-center bg-neutral-800/40">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-4 overflow-hidden text-left align-middle transition-all transform rounded-lg shadow-md bg-neutral-50">
                  <Dialog.Title as="h4" className="mb-4 text-lg font-medium underline decoration-2 decoration-primary-600">
                    Payment successful
                  </Dialog.Title>
                  {children}
                  {/* <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleClose}
                    >
                      Got it, thanks!
                    </button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };

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
