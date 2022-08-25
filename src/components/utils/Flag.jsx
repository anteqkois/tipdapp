import { CheckCircleIcon as FalseIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as TrueIcon } from '@heroicons/react/24/solid';
import Tooltip from './Tooltip';

const Flag = ({ flag, tooltip, className }) => {
  return (
    <Tooltip content={tooltip}>
      {flag ? (
        <TrueIcon className="w-7 p-0.5 rounded-full bg-neutral-150 fill-success-600" />
      ) : (
        <FalseIcon className="w-7 p-0.5 rounded-full bg-neutral-150" />
      )}
    </Tooltip>
  );
};

export default Flag;
