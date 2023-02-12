import { CheckCircleIcon as FalseIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as TrueIcon } from '@heroicons/react/24/solid';
import { useMemo } from 'react';
import { Tooltip } from './Tooltip';

type Props = {
  flag: boolean;
  tooltip?: string;
};

const flagIcon: Record<number, JSX.Element> = {
  1: (
    <TrueIcon className="w-7 rounded-full bg-neutral-150 fill-success-600 p-0.5" />
  ),
  0: (
    <FalseIcon className="w-7 rounded-full bg-neutral-150 stroke-neutral-500 p-0.5" />
  ),
};

export const Flag = ({ flag, tooltip }: Props) => {
  const icon = useMemo(() => flagIcon[Number(flag)], [flag]);

  return tooltip ? <Tooltip content={tooltip}>{icon}</Tooltip> : icon;
};
