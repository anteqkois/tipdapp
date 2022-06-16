import { ethers } from 'ethers';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Button from '../utils/Button';
import CopyToClipboard from '../utils/CopyToClipboard';
import Flag from '../utils/Flag';
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
        <h5 className="inline-block  mr-3 text-purple-600 font-semibold">@{tipper.nick}</h5>
        <div className='flex gap-1.5'>
          <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M13.5 2c-5.629 0-10.212 4.436-10.475 10h-3.025l4.537 5.917 4.463-5.917h-2.975c.26-3.902 3.508-7 7.475-7 4.136 0 7.5 3.364 7.5 7.5s-3.364 7.5-7.5 7.5c-2.381 0-4.502-1.119-5.876-2.854l-1.847 2.449c1.919 2.088 4.664 3.405 7.723 3.405 5.798 0 10.5-4.702 10.5-10.5s-4.702-10.5-10.5-10.5z" />
          </svg>
          <Flag flag={displayed} />
        </div>
      </div>
      <p className="inline-block -mt-0.5 mr-auto text-sm text-neutral-500">
        {dayjs(date).format('MMM DD YYYY, HH:MM')} ({dayjs(date).fromNow()})
      </p>
      <p className={`w-full py-2 leading-tight ${!details && 'truncate'}`}>{message}</p>
      <div>
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
              <Flag className="w-5 h-5 -mt-1" flag={displayed} />
            </p>
          </div>
        ) : (
          <p className="text-sm font-medium">
            {cryptocurrency.symbol}: {ethers.utils.formatEther(tokenAmount)}
            <span className="font-normal text-neutral-500"> ({ethers.utils.formatEther(value)}$)</span>
          </p>
        )}
      </div>
      <div className="h-7 w-full mb-2 flex items-center center" onClick={() => setDetails((prev) => !prev)}>
        <Button type="minimalist">{details ? 'hide' : 'display'} details</Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`inline ml-1 w-4 h-4 fill-neutral-700 cursor-pointer ${details ? ' -rotate-90' : 'mt-2 rotate-90'}`}
          viewBox="0 0 24 24"
        >
          {details ? (
            <path d="M16 8v-4l8 8-8 8v-4h-8.929c-9.059 0-7.134-9.521-6.335-11.418.789 2.445 2.465 3.418 5.372 3.418h9.892z" />
          ) : (
            <path d="M16 16v4l8-8-8-8v4h-8.929c-9.059 0-7.134 9.521-6.334 11.418.788-2.445 2.464-3.418 5.371-3.418h9.892z" />
          )}
        </svg>
      </div>
    </div>
  );
};

export default Tip;
