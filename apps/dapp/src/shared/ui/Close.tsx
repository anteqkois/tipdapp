import { XMarkIcon } from '@heroicons/react/24/outline';
import { MouseEventHandler } from 'react';

type Props = {
  onClick: MouseEventHandler;
};

export const Close = ({ onClick }: Props) => (
  <button
    type="button"
    className="state-focus animate-action h-6 w-6 rounded-full bg-neutral-150"
    onClick={onClick}
  >
    <XMarkIcon className="h-6 w-6 stroke-neutral-600 p-1 ease-in-out" />
  </button>
);
