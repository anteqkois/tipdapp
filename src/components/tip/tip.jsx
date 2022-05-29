import { ethers } from 'ethers';
import React, { useState } from 'react';
import Button from '../utils/Button';
// const { parseUnits, formatUnits } = ethers.utils;

const Tip = ({
  txHash,
  tokenAmount,
  value,
  message,
  showed,
  date,
  userWalletAddress,
  nick,
  cryptocurrencyAddress,
  symbol,
  tipperWalletAddress,
}) => {
  const [details, setDetails] = useState(false);
  return (
    <div className="flex gap-1 flex-wrap">
      {/* <span className="hidden aspect-square max-w-20 bg-primary-800 rounded" /> */}
      <div className="w-full flex items-center">
        <h6 className="inline-block text-purple-600 font-semibold">@{nick}</h6>
        <p className="inline-block mr-auto px-2 text-sm">{date}</p>
        <svg
          className={`inline-block w-6 mr-1 ${showed ? 'fill-secondary-600' : 'fill-neutral-300'}`}
          clip-rule="evenodd"
          fill-rule="evenodd"
          stroke-linejoin="round"
          stroke-miterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-5.049 10.386 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z"
            fill-rule="nonzero"
          />
        </svg>
      </div>
      <p className={!details && 'truncate'}>{message}</p>
      <div>
        <p className="font-medium">
          {symbol}: {ethers.utils.formatEther(tokenAmount)}
          <span className="font-normal"> ({ethers.utils.formatEther(value)}$)</span>
        </p>
      </div>
      <div className="h-7 w-full flex items-center center" onClick={() => setDetails((prev) => !prev)}>
        <svg
          className={`h-10 -mx-1 origin-center duration-500 translate-y-0.5 ${details && 'rotate-180'}`}
          clip-rule="evenodd"
          fill-rule="evenodd"
          stroke-linejoin="round"
          stroke-miterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291zm-7.564.289h5.446l-2.718 3.522z"
            fill-rule="nonzero"
          />
        </svg>
        <Button type="minimalist">details</Button>
      </div>
    </div>
  );
};

export default Tip;
