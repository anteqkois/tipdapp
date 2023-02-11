import { CheckBadgeIcon as NoVerifiedIcon } from '@heroicons/react/24/outline';
import { CheckBadgeIcon as VerifiedIcon } from '@heroicons/react/24/solid';
import Tooltip from './Tooltip';

type Props = {
  verified: boolean;
};

export const Verified = ({ verified }: Props) => verified ? (
    <Tooltip content="Verified user">
      <VerifiedIcon className="inline-block h-[1em] fill-primary-700" />
    </Tooltip>
  ) : (
    <Tooltip content="Not verified user">
      <NoVerifiedIcon className="inline-block h-[1em] stroke-2 stroke-neutral-400" />
    </Tooltip>
  );
