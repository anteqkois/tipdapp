import { InfoMessage } from '@/shared/ui';
import { TipUI } from '@tipdapp/database';
import TipCard from '../components/Tip';
import TipMinimalist from '../components/TipMinimalist';

type Props = {
  tips: TipUI[];
  tipView: TipView;
};

type TipView = keyof typeof tipViewComponents;

//TODO! chnage it to accept tipView props as a ReactCompnent which get tips as a props
const tipViewComponents = {
  Card: TipCard,
  Minimalist: TipMinimalist,
};
export const TipsList = ({ tips, tipView }: Props) => {
  const TipView = tipViewComponents[tipView];

  return tips.length === 0 ? (
    <InfoMessage>No tips to show!</InfoMessage>
  ) : (
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
