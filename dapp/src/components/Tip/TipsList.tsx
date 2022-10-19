import { TipUI } from '@/types/models';
import TipCard from './Tip';
import TipMinimalist from './TipMinimalist';

type Props = {
  tips: TipUI[];
  tipView: TipView;
};

type TipView = keyof typeof tipViewComponents;

const tipViewComponents = {
  Card: TipCard,
  Minimalist: TipMinimalist,
};
export const TipsList = ({ tips, tipView }: Props) => {
  const TipView = tipViewComponents[tipView];

  return (
    <ul className="space-y-3">
      {tips.map((tip: TipUI) => (
        <li
          key={tip.txHash}
          className="w-full"
        >
          <TipView {...tip} />
        </li>
      ))}
    </ul>
  );
};
