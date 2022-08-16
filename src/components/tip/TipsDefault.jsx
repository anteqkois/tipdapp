import React from 'react'
import Tip from './Tip';

const TipsDefault = ({ tips }) => {
  return (
    <ul>
      {tips.length > 0 ? (
        tips.map((tip) => (
          <li key={tip.txHash} className="w-full">
            <Tip {...tip} />
            <div className="w-[calc(100%+2rem)] -mx-4 bg-neutral-300 h-[1.5px] lg:w-[calc(100%+4rem)] lg:-mx-8" />
          </li>
        ))
      ) : (
        <li className="w-full text-center">No tips to show</li>
      )}
    </ul>
  );
};

export default TipsDefault