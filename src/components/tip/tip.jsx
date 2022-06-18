import { ethers } from 'ethers';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Button from '../utils/Button';
import CopyToClipboard from '../utils/CopyToClipboard';
import Flag from '../utils/Flag';
import Tooltip from '../utils/Tooltip';
// const { parseUnits, formatUnits } = ethers.utils;

dayjs.extend(relativeTime);

// cryptocurrency:
// name: "SAND"
// symbol: "SAND"
// [[Prototype]]: Object
// cryptocurrencyAddress: "0x3845badAde8e6dFF049820680d1F14bD3903a5d0"
// date: "2022-06-03T21:19:42.357Z"
// displayed: false
// message: "It's test, maybe it's working ?"
// tipper:
// nick: "tiperOne"
// [[Prototype]]: Object
// tipperWalletAddress: "0xfdacb27dc605f21255108d4895bb91701a2c26cd"
// tokenAmount: "2100000000000000"
// txHash: "0xd55ac901ac86f1856839019bd4d031c9929ba60a"
// userWalletAddress: "0x4302c27398994a37d1cae83e5b49e40de9e3658d"
// value: "4300000000000000"

// txHash: '0x05f40c178a69696d31ed6bd4ae72ec2655840c915e9e1f19f25f470e1cb4b26a',
//     tokenAmount: '789356000000000000000000',
//     value: '80000000000000000000',
//     message:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quo provident error sunt? Voluptate atque, nihil illum voluptates autem, dolores tempora nisi aperiam aut iusto sunt debitis eveniet, eligendi laboriosam.',
//     showed: true,
//     date: '17 March 2022; 21.15',
//     userWalletAddress: '0xd6454929839ff72b9db63aee5d6d08779bdb82e7',
//     cryptocurrencyAddress: '0xd6454929839ff72b9db63aee5d6d08779bdb82e7',
//     symbol: 'SHIB',
//     tipperWalletAddress: '0xbaea370e859a7c6caaf6967e49c255b050c58c30',
//     nick: 'rudy56',

const Tip = ({
  txHash,
  tokenAmount,
  value,
  message,
  displayed,
  date,
  userWalletAddress,
  tipper,
  tipperWalletAddress,
  cryptocurrency,
}) => {
  const [details, setDetails] = useState(false);

  return (
    <div className="flex flex-wrap py-2 overflow-visible">
      <div className="w-full flex items-center justify-between">
        <h5 className="inline-block mr-3 text-purple-600 font-semibold z-40">@{tipper.nick}</h5>
        <div className="flex gap-1.5">
          <Tooltip content="Display again">
            <svg
              className="w-7 h-7 p-0.5 cursor-pointer bg-neutral-200 rounded-full hover:bg-neutral-150"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z" />
            </svg>
          </Tooltip>
          <Flag flag={displayed} tooltip="Display" className="w-7 h-7" />
        </div>
      </div>
      <p className="w-full -mt-0.5 text-sm text-neutral-500">
        {dayjs(date).format('MMM DD YYYY, HH:MM')} ({dayjs(date).fromNow()})
      </p>
      <p className={`py-2 leading-tight max-w-4xl ${!details && 'truncate'}`}>{message}</p>
      <div className="w-full">
        <h6 className="text-primary-600 text-base">Details:</h6>
        {details ? (
          <div className="text-sm text-neutral-500">
            <p>
              <span className="text-neutral-900 font-medium">Token Symbol: </span>
              {cryptocurrency.symbol}
            </p>
            <p>
              <span className="text-neutral-900 font-medium">Amount: </span>
              {ethers.utils.formatEther(tokenAmount)}
            </p>
            <p>
              <span className="text-neutral-900 font-medium">Value: </span>
              {ethers.utils.formatEther(value)}$
            </p>
            <p>
              <span className="text-neutral-900 font-medium">Transaction Hash: </span>
              {txHash}
              <CopyToClipboard copyData={txHash} />
            </p>
            <p>
              <span className="text-neutral-900 font-medium">Tipper Address: </span>
              {tipperWalletAddress}
              <CopyToClipboard copyData={tipperWalletAddress} />
            </p>
            <p>
              <span className="text-neutral-900 font-medium">Displayed: </span>
              <Flag flag={displayed} className="w-5 h-5 -mt-1" />
            </p>
          </div>
        ) : (
          <p className="text-sm font-medium">
            {cryptocurrency.symbol}: {ethers.utils.formatEther(tokenAmount)}
            <span className="font-normal text-neutral-500"> ({ethers.utils.formatEther(value)}$)</span>
          </p>
        )}
      </div>
      <Button type="minimalist" className="h-7 my-1 cursor-pointer" onClick={() => setDetails((prev) => !prev)}>
        {details ? 'hide' : 'display'} details
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`inline ml-1 w-4 h-4 fill-neutral-700 ${details ? ' -rotate-90' : 'translate-y-0.5 rotate-90'}`}
          viewBox="0 0 24 24"
        >
          {details ? (
            <path d="M16 8v-4l8 8-8 8v-4h-8.929c-9.059 0-7.134-9.521-6.335-11.418.789 2.445 2.465 3.418 5.372 3.418h9.892z" />
          ) : (
            <path d="M16 16v4l8-8-8-8v4h-8.929c-9.059 0-7.134 9.521-6.334 11.418.788-2.445 2.464-3.418 5.371-3.418h9.892z" />
          )}
        </svg>
      </Button>
    </div>
  );
};

export default Tip;
