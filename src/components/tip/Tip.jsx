import Card from '@/components/utils/Card';
import Flag from '@/components/utils/Flag';
import Tooltip from '@/components/utils/Tooltip';
import useClipboard from '@/hooks/useClipboard';
import useModal from '@/hooks/useModal';
import cutAddress from '@/utils/cutAddress';
import { ArrowPathIcon, ArrowsPointingOutIcon, AtSymbolIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import Button from '../utils/Button';
// import CopyToClipboard from '../utils/CopyToClipboard';
// const { parseUnits, formatUnits } = ethers.utils;

dayjs.extend(relativeTime);

[
  {
    txHash: '0xd12ac901ac86f1856839019bd4d031c9929bafd4',
    tokenAmount: '900000000000000000',
    value: '562000000000000000000',
    message: '4 New wallet !',
    displayed: false,
    date: '2022-09-11T07:09:01.124Z',
    userWalletAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    cryptocurrencyAddress: '0x3845badAde8e6dFF049820680d1F14bD3903a5d0',
    tipperWalletAddress: '0xfdacb27dc605f21255108d4895bb91701a2c26cd',
    cryptocurrency: {
      name: 'SAND',
      symbol: 'SAND',
    },
    tipper: {
      nick: 'tiperOne',
    },
  },
];

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
  const [DetailsModal, DetailsContent, DetailsTrigger, setShowDetails, showDetails] = useModal();
  const { ClipboardIcon, handleCopy } = useClipboard();

  useEffect(() => {
    setShowDetails(true);
  }, []);

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
      {/* arrow-top-right-on-sq clipboard-document document-duplicate*/}
      <DetailsModal>
        <DetailsTrigger>
          <Button option="minimalist" className="cursor-pointer h-7 animate-action hover:scale-[1.02] origin-top-left">
            <ArrowsPointingOutIcon className="inline w-5 mr-1" />
            display details
          </Button>
        </DetailsTrigger>
        <DetailsContent title="Tip details">
          <Card className="shadow-none text-neutral-600">
            <h6>Transaction</h6>
            <p>
              <span className="font-medium text-neutral-600">Date: </span>
              {dayjs(date).format('MMM DD YYYY, HH:MM')} ({dayjs(date).fromNow()})
            </p>
            <p className="flex items-center  gap-1">
              <span className="font-medium ">Transaction Hash: </span>
              {cutAddress(txHash)}
              <ClipboardIcon copyData={txHash} message="Transaction hash copied !" />
            </p>
            <p className="flex items-end">
              <a
                tabIndex="-1"
                href="https://zksync2-testnet.zkscan.io/address/0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266/transactions"
                target={'_blank'}
                rel="noreferrer"
              >
                <Button option="link" className="font-medium text-neutral-600 mr-1">
                  View on Explorer
                </Button>
              </a>
            </p>
          </Card>
          <Card className="shadow-none text-neutral-600">
            <h6>Tiper</h6>
            <p className="flex items-end ">
              <span className="font-medium mr-1">Nick: </span>
              <AtSymbolIcon className="w-5" />
              {tipper.nick}
            </p>
            <p className="flex items-center  gap-1">
              <span className="font-medium ">Address: </span>
              {cutAddress(tipperWalletAddress)}
              <ClipboardIcon copyData={tipperWalletAddress} message="Address copied !" />
            </p>
            <p className="flex items-end">
              <a
                tabIndex="-1"
                href="https://zksync2-testnet.zkscan.io/address/0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266/transactions"
                target={'_blank'}
                rel="noreferrer"
              >
                <Button option="link" className="font-medium text-neutral-600 mr-1">
                  View on Explorer
                </Button>
              </a>
            </p>
          </Card>
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
