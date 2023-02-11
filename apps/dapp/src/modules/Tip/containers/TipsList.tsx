import { InfoMessage } from '@/shared/ui';
import { TipUI } from '@tipdapp/database';
import { Tip } from '../components/Tip';
import { TipMinimalist } from '../components/TipMinimalist';

type Props = {
  tips: TipUI[];
  tipView: TipView;
};

type TipView = keyof typeof tipViewComponents;

// TODO! chnage it to accept tipView props as a ReactCompnent which get tips as a props
// TODO! or to accept one children as a tip representation and next use ReactCopyElement
const tipViewComponents = {
  Card: Tip,
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
