import { TipUI } from '@/ts/models';
import Tip from './Tip';

type Props = {
  tips: TipUI[];
};

const TipsDefault = ({ tips }: Props) => {
  return (
    <ul className="space-y-3">
      {tips.map((tip: TipUI) => (
        <li
          key={tip.txHash}
          className="w-full"
        >
          <Tip {...tip} />
        </li>
      ))}
    </ul>
  );
};

export default TipsDefault;
