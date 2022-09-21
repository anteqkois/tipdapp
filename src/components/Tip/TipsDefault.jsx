import Tip from './Tip';

const TipsDefault = ({ tips }) => {
  return (
    <ul className="space-y-3">
      {tips.map((tip) => (
        <li key={tip.txHash} className="w-full">
          <Tip {...tip} />
        </li>
      ))}
    </ul>
  );
};

export default TipsDefault;
