import Card from '@/components/utils/Card';
import { XIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const ModalProvider = () => <div id="modal" />;

const useModal = () => {
  const [showModal, setShowModal] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const Modal = ({ children, title, className, onClose }) => {
    const handleClose = () => {
      onClose();
      setShowModal(false);
    };

    return mounted && showModal
      ? createPortal(
          <div className="fixed inset-0 z-40 p-2 flex-center bg-neutral-800/40 " onClick={() => setShowModal(false)}>
            <Card
              className="w-fit max-w-[100%] break-word ring-1 ring-neutral-900 ring-opacity-5 z-50 lg:max-w-2xl animate-enter"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between mb-4">
                <h5 className="underline decoration-2 decoration-primary-600">{title}</h5>
                <XIcon className="p-1 ease-in-out rounded-full bg-neutral-300 w-7 h-7 stroke-neutral-600 animate-action" />
              </div>
              {children}
            </Card>
          </div>,
          document.getElementById('modal'),
        )
      : null;
  };

  return [setShowModal, Modal];
};
export default useModal;
