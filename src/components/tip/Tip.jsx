import Card from '@/components/utils/Card';
import Flag from '@/components/utils/Flag';
import Tooltip from '@/components/utils/Tooltip';
import useModal from '@/hooks/useModal';
import { ArrowPathIcon, ArrowsPointingOutIcon, AtSymbolIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ethers } from 'ethers';
import Button from '../utils/Button';
import CopyToClipboard from '../utils/CopyToClipboard';
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
  // const [details, setDetails] = useState(false);
  // const DisplayDetailsButton = () => {
  //   return (
  //     <Button option="minimalist" className="cursor-pointer h-7 animate-action hover:scale-[1.02] origin-top-left">
  //       <ArrowsPointingOutIcon className="inline w-5 mr-1" />
  //       display details
  //     </Button>
  //   );
  // };

  const [DetailsModal, DetailsContent, DetailsTrigger, setShowDetails, showDetails] = useModal();

  return (
    <Card>
      <div className="flex items-center justify-between w-full flex-wrap gap-1">
        <h5 className="text-xl flex items-end mr-3 font-semibold text-purple-600 lg:text-2xl">
          <AtSymbolIcon className="w-6 lg:w-7 " />
          {tipper.nick}
        </h5>
        <div className="flex gap-1.5">
          <Tooltip content="Display again">
            <ArrowPathIcon className="w-7 p-0.5 rounded-full bg-neutral-150 animate-action" />
          </Tooltip>
          <Flag flag={displayed} tooltip="Displayed" className="w-7 h-7" />
        </div>
      </div>
      <p className="pt-2 pb-3 leading-tight max-w-4xl truncate">{message}</p>
      {/* <p className={`pt-2 pb-3 leading-tight max-w-4xl ${!showDetails && 'truncate'}`}>{message}</p> */}
      <div className="w-full mb-2">
        <h6 className=" text-primary-600">Tip details:</h6>
        {/* {details ? (
          <div className=" text-neutral-500">
            <p>
              <span className="font-medium text-neutral-600">Date: </span>
              {dayjs(date).format('MMM DD YYYY, HH:MM')} ({dayjs(date).fromNow()})
            </p>
            <p>
              <span className="font-medium text-neutral-600">Token Symbol: </span>
              {cryptocurrency.symbol}
            </p>
            <p>
              <span className="font-medium text-neutral-600">Amount: </span>
              {ethers.utils.formatEther(tokenAmount)}
            </p>
            <p>
              <span className="font-medium text-neutral-600">Value: </span>
              {ethers.utils.formatEther(value)}$
            </p>
            <p className="pt-1.5 leading-4 md:pt-0 md:leading-normal">
              <span className="font-medium text-neutral-600 ">Transaction Hash: </span>
              <span className="text-[13px] md:text-sm whitespace-nowrap">{txHash} </span>
              <CopyToClipboard copyData={txHash} />
            </p>
            <p className="py-1.5 leading-none md:py-0 md:leading-normal">
              <span className="font-medium text-neutral-600">Tipper Address: </span>
              <span className="text-[13px] md:text-sm">{tipperWalletAddress}</span>
              <CopyToClipboard copyData={tipperWalletAddress} />
            </p>
            <p>
              <span className="font-medium text-neutral-600">Displayed: </span>
              <Flag flag={displayed} className="w-5 h-5 -mt-1" />
            </p>
          </div>
        ) : ( */}
        <>
          <p>
            <span className="font-medium text-neutral-600">Date: </span>
            {dayjs(date).format('MMM DD YYYY, HH:MM')} ({dayjs(date).fromNow()})
          </p>
          <p className="font-medium text-neutral-600">
            {cryptocurrency.symbol}: {ethers.utils.formatEther(tokenAmount)}
            <span className="font-normal text-neutral-500"> ({ethers.utils.formatEther(value)}$)</span>
          </p>
        </>
        {/* )} */}
      </div>

      <DetailsModal>
        <DetailsTrigger>
          <Button option="minimalist" className="cursor-pointer h-7 animate-action hover:scale-[1.02] origin-top-left">
            <ArrowsPointingOutIcon className="inline w-5 mr-1" />
            display details
          </Button>
        </DetailsTrigger>
        <DetailsContent title="Tip details">
          <p className="flex items-end">
            <span className="font-medium text-neutral-600 mr-1">Tiper: </span>
            <AtSymbolIcon className="w-5" />
            {tipper.nick}
          </p>
          <p>
            <span className="font-medium text-neutral-600">Date: </span>
            {dayjs(date).format('MMM DD YYYY, HH:MM')} ({dayjs(date).fromNow()})
          </p>
          <p>
            <span className="font-medium text-neutral-600">Token Symbol: </span>
            {cryptocurrency.symbol}
          </p>
          <p>
            <span className="font-medium text-neutral-600">Amount: </span>
            {ethers.utils.formatEther(tokenAmount)}
          </p>
          <p>
            <span className="font-medium text-neutral-600">Value: </span>
            {ethers.utils.formatEther(value)}$
          </p>
          <p className="pt-1.5 leading-4 md:pt-0 md:leading-normal">
            <span className="font-medium text-neutral-600 ">Transaction Hash: </span>
            <span className="text-[13px] md:text-sm whitespace-nowrap">{txHash} </span>
            <CopyToClipboard copyData={txHash} />
          </p>
          <p className="py-1.5 leading-none md:py-0 md:leading-normal">
            <span className="font-medium text-neutral-600">Tipper Address: </span>
            <span className="text-[13px] md:text-sm">{tipperWalletAddress}</span>
            <CopyToClipboard copyData={tipperWalletAddress} />
          </p>
          <p>
            <span className="font-medium text-neutral-600">Displayed: </span>
            <Flag flag={displayed} className="w-5 h-5 -mt-1" />
          </p>
        </DetailsContent>
      </DetailsModal>
    </Card>
  );
};

export default Tip;
