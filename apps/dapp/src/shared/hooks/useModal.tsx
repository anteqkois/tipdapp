'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, {
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useState,
} from 'react';

const ModalProvider = () => <div id="modal" />;

const useModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const Modal = ({ children }: { children: ReactNode }): JSX.Element => (
    <DialogPrimitive.Root
      open={showModal}
      onOpenChange={setShowModal}
      modal
    >
      {children}
    </DialogPrimitive.Root>
  );

  const ModalTrigger = ({ children }: { children: ReactNode }): JSX.Element => (
    <DialogPrimitive.Trigger
      asChild
      className="state-focus"
    >
      {children}
    </DialogPrimitive.Trigger>
  );

  type ModalProps = {
    title: string;
    icon: ReactElement;
    description?: string;
  } & HTMLAttributes<HTMLDivElement>;

  const ModalContent = React.forwardRef<
    DialogPrimitive.DialogContentProps & HTMLDivElement,
    ModalProps
  >(({ children, title, icon, description, className, ...props }, ref) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className="md:flex-center fixed inset-0 z-40 overflow-scroll bg-neutral-800/40 p-2"
        forceMount
      >
        <DialogPrimitive.Content
          className={`break-word z-50 w-full  max-w-md rounded bg-neutral-50 p-4 shadow-md ${className}`}
          forceMount
          onOpenAutoFocus={(e) => e.preventDefault()}
          {...props}
          ref={ref}
        >
          <div className="mb-4 flex justify-between">
            <DialogPrimitive.Title asChild>
              <h4 className="flex items-center justify-center gap-1">
                {icon && (
                  <span className="[&>*]:h-9 [&>*]:w-9 [&>*]:stroke-2">
                    {icon}
                  </span>
                )}
                {title}
              </h4>
            </DialogPrimitive.Title>
            <DialogPrimitive.Close asChild>
              <div
                tabIndex={0}
                role="button"
                onClick={() => setShowModal(false)}
                onKeyDown={(key) => key.code === 'Enter' && setShowModal(false)}
                className="state-focus animate-action h-6 w-6 rounded-full bg-neutral-150"
              >
                <XMarkIcon className="h-6 w-6 stroke-neutral-600 p-1 ease-in-out" />
              </div>
            </DialogPrimitive.Close>
          </div>
          <DialogPrimitive.Description className="text-sm">
            {description}
          </DialogPrimitive.Description>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Overlay>
    </DialogPrimitive.Portal>
  ));

  ModalContent.displayName = 'ModalContent';

  return [Modal, ModalContent, ModalTrigger, setShowModal, showModal] as const;
};

export { useModal, ModalProvider };
