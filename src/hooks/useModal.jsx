import { XMarkIcon } from '@heroicons/react/24/outline';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, { useEffect, useState } from 'react';
export const ModalProvider = () => <div id="modal" />;

const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const Modal = ({ children }) => {
    return (
      <DialogPrimitive.Root open={showModal} onOpenChange={setShowModal} modal={true}>
        {children}
      </DialogPrimitive.Root>
    );
  };

  const ModalTrigger = ({ children }) => {
    return (
      <DialogPrimitive.Trigger asChild className="state-focus">
        {children}
      </DialogPrimitive.Trigger>
    );
  };

  const ModalContent = React.forwardRef(({ children, title, description, className, ...props }, forwardedRef) => {
    return mounted ? (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed flex-center inset-0 z-40 p-2 bg-neutral-800/40" forceMount>
          <DialogPrimitive.Content
            className={`z-50 w-full p-4 overflow-hidden max-w-md break-word rounded shadow-md bg-neutral-50 ${className}`}
            forceMount
            {...props}
            ref={forwardedRef}
          >
            <div className="flex justify-between mb-4">
              <DialogPrimitive.Title>
                <h6 className="">{title}</h6>
              </DialogPrimitive.Title>
              <DialogPrimitive.Close className="rounded-full bg-neutral-150 state-focus w-6 h-6 animate-action">
                <XMarkIcon className="p-1 ease-in-out w-6 h-6 stroke-neutral-600" />
              </DialogPrimitive.Close>
            </div>
            <DialogPrimitive.Description className="text-sm">{description}</DialogPrimitive.Description>
            {children}
          </DialogPrimitive.Content>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    ) : null;
  });

  ModalContent.displayName = 'ModalContent';

  return [Modal, ModalContent, ModalTrigger, setShowModal, showModal];
};

export default useModal;
