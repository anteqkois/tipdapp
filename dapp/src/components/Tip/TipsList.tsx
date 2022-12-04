import { TipUI } from '@anteqkois/server';
import { InfoMessage } from '../utils';
import TipCard from './Tip';
import TipMinimalist from './TipMinimalist';

type Props = {
  tips: TipUI[];
  tipView: TipView;
};

type TipView = keyof typeof tipViewComponents;

//TODO! chnage it to accept ReactCompnent wchich Tip as a Prop, string not literal
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
