import { XMarkIcon } from '@heroicons/react/24/outline';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, { HTMLAttributes, ReactNode, useEffect, useState } from 'react';
export const ModalProvider = () => <div id="modal" />;

export const useModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const Modal = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
      <DialogPrimitive.Root
        open={showModal}
        onOpenChange={setShowModal}
        modal={true}
      >
        {children}
      </DialogPrimitive.Root>
    );
  };

  const ModalTrigger = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
      <DialogPrimitive.Trigger
        asChild
        className="state-focus"
      >
        {children}
      </DialogPrimitive.Trigger>
    );
  };

  type ModalProps = {
    title: string;
    description?: string;
  } & HTMLAttributes<HTMLDivElement>;

  const ModalContent = React.forwardRef<
    DialogPrimitive.DialogContentProps & HTMLDivElement,
    ModalProps
  >(({ children, title, description, className, ...props }, ref) => {
    return mounted ? (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-40 p-2 overflow-scroll bg-neutral-800/40 md:flex-center"
          forceMount
        >
          <DialogPrimitive.Content
            className={`z-50 w-full p-4  max-w-md break-word rounded shadow-md bg-neutral-50 ${className}`}
            forceMount
            {...props}
            ref={ref}
          >
            <div className="flex justify-between mb-4">
              <DialogPrimitive.Title>
                <p className="text-lg">{title}</p>
              </DialogPrimitive.Title>
              <DialogPrimitive.Close
                className="rounded-full bg-neutral-150 state-focus w-6 h-6 animate-action"
              >
                <XMarkIcon className="p-1 ease-in-out w-6 h-6 stroke-neutral-600" />
              </DialogPrimitive.Close>
            </div>
            <DialogPrimitive.Description className="text-sm">
              {description}
            </DialogPrimitive.Description>
            {children}
          </DialogPrimitive.Content>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    ) : null;
  });

  ModalContent.displayName = 'ModalContent';

  return [Modal, ModalContent, ModalTrigger, setShowModal, showModal] as const;
};

export default useModal;
