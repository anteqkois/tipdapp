import { XMarkIcon } from "@heroicons/react/24/outline";

export const Close = ({onClick}) => {
  return (
    <span className="rounded-full bg-neutral-150 state-focus w-6 h-6 animate-action" onClick={onClick}>
      <XMarkIcon className="p-1 ease-in-out w-6 h-6 stroke-neutral-600" />
    </span>
  );
}