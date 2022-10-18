import { XMarkIcon } from '@heroicons/react/24/outline';
import { MouseEventHandler } from 'react';

type Props = {
  onClick: MouseEventHandler;
};

export const Close = ({ onClick }: Props) => {
  return (
    <span
      className="rounded-full bg-neutral-150 state-focus w-6 h-6 animate-action"
      onClick={onClick}
    >
      <XMarkIcon className="p-1 ease-in-out w-6 h-6 stroke-neutral-600" />
    </span>
  );
};
