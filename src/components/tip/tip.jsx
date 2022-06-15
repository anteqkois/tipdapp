import { ethers } from 'ethers';
import React, { useState } from 'react';
import moment from 'moment';
import Button from '../utils/Button';
// const { parseUnits, formatUnits } = ethers.utils;

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
  showed,
  date,
  userWalletAddress,
  tipper,
  tipperWalletAddress,
  cryptocurrency,
}) => {
  const [details, setDetails] = useState(false);
  // console.log(moment(date).fromNow());
  return (
    <div className="flex flex-wrap py-2 overflow-visible">
      <div className="w-full flex items-center justify-between">
        <h6 className="inline-block  mr-3 text-purple-600 font-semibold">@{tipper.nick}</h6>
        <svg
          className={`inline-block w-6 mr-1 ${showed ? 'fill-secondary-600' : 'fill-neutral-300'}`}
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-5.049 10.386 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z"
            fillRule="nonzero"
          />
        </svg>
      </div>
      <p className="inline-block -mt-0.5 mr-auto text-sm text-neutral-500">
        {moment(date).format('MMMM Do YYYY, h:mm:ss a')} ({moment(date).fromNow()})
      </p>
      <p className={`w-full py-2 ${!details && 'truncate'}`}>{message}</p>
      <div>
        <p>
          {cryptocurrency.symbol}: {ethers.utils.formatEther(tokenAmount)}
          <span className="font-normal"> ({ethers.utils.formatEther(value)}$)</span>
        </p>
      </div>
      <div className="h-7 w-full mb-2 flex items-center center" onClick={() => setDetails((prev) => !prev)}>
        <svg
          className={`h-10 -mx-1 origin-center duration-500 translate-y-0.5 ${details && 'rotate-180'}`}
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291zm-7.564.289h5.446l-2.718 3.522z"
            fillRule="nonzero"
          />
        </svg>
        <Button type="minimalist">details</Button>
      </div>
      <span className="w-full bg-neutral-300 h-[1.5px]" />
    </div>
  );
};

export default Tip;
