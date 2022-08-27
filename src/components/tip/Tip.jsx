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
  cryptocurrencyAddress,
  cryptocurrency,
}) => {
  const [DetailsModal, DetailsContent, DetailsTrigger, setShowDetails, showDetails] = useModal();
  const { ClipboardIcon, handleCopy } = useClipboard();

  return (
    <Card>
      {/* <h1>Lorem ipsum dolor sit, elit SAND</h1>
      <h2>Lorem ipsum dolor sit, elit SAND</h2>
      <h3>Lorem ipsum dolor sit, elit SAND</h3>
      <h4>Lorem ipsum dolor sit, elit SAND</h4>
      <h5>Lorem ipsum dolor sit, elit SAND</h5>
      <h6>Lorem ipsum dolor sit, elit SAND</h6> */}
      <div className="flex items-center justify-between w-full flex-wrap gap-1">
        <h5 className=" mr-3 lg:text-2xl">
          <AtSymbolIcon className="inline text-primary w-6 lg:w-7 " />
          <i className="text-primary">{tipper.nick} </i>
          sent {ethers.utils.formatEther(tokenAmount)}
          <i className="text-secondary "> ${cryptocurrency.symbol}</i>:
        </h5>
        <div className="flex gap-1.5">
          <Tooltip content="Display again">
            <ArrowPathIcon className="w-7 p-0.5 rounded-full bg-neutral-150 animate-action" />
          </Tooltip>
          <Flag flag={displayed} tooltip="Displayed" className="w-7 h-7" />
        </div>
      </div>
      <p className="pt-2 pb-3 leading-tight max-w-4xl truncate">{message}</p>
      <div className="w-full mb-2">
        <h6 className=" text-primary font-semibold">Tip details:</h6>
        <p>
          <span className="font-medium text-neutral-light">Date: </span>
          {dayjs(date).format('MMM DD YYYY, HH:MM')} ({dayjs(date).fromNow()})
        </p>
        <p className="font-medium text-neutral-light">
          Token:
          <span className="font-normal text-neutral-500">
            {' '}
            {ethers.utils.formatEther(tokenAmount)} {cryptocurrency.symbol} ({ethers.utils.formatEther(value)}$)
          </span>
        </p>
      </div>
      <DetailsModal>
        <DetailsTrigger>
          <Button option="minimalist" className="h-7">
            <ArrowsPointingOutIcon className="inline w-5 mr-1" />
            display details
          </Button>
        </DetailsTrigger>
        <DetailsContent title="Tip details" className="space-y-2">
          <Card className="shadow-none text-neutral-800 !p-2">
            <h6 className="text-primary">Tipper&apos;s Message</h6>
            <p className="p-1 leading-tight max-w-4xl">{message}</p>
          </Card>
          <Card className="shadow-none text-neutral-800 !p-2">
            <h6 className="text-primary">Value and Token</h6>
            <p>
              <span className="font-medium text-neutral-700">Value: </span>
              {ethers.utils.formatEther(value)}$
            </p>
            <p>
              <span className="font-medium text-neutral-700">Symbol: </span>
              {cryptocurrency.symbol}
            </p>
            <p>
              <span className="font-medium text-neutral-700">Amount: </span>
              {ethers.utils.formatEther(tokenAmount)}
            </p>
            <p className="flex items-center  gap-1">
              <span className="font-medium ">Address: </span>
              {cutAddress(cryptocurrencyAddress)}
              <ClipboardIcon copyData={cryptocurrencyAddress} message="Address copied !" />
            </p>
            <a
              tabIndex="-1"
              href="https://zksync2-testnet.zkscan.io/address/0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266/transactions"
              target={'_blank'}
              rel="noreferrer"
            >
              <Button option="link" className="font-medium text-neutral-700 mr-1">
                View token on Explorer
              </Button>
            </a>
          </Card>
          <Card className="shadow-none text-neutral-800 !p-2">
            <h6 className="text-primary">Tipper</h6>
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
                <Button option="link" className="font-medium text-neutral-700 mr-1">
                  View on Explorer
                </Button>
              </a>
            </p>
          </Card>
          <Card className="shadow-none text-neutral-800 !p-2">
            <h6 className="text-primary">Transaction</h6>
            <p>
              <span className="font-medium text-neutral-700">Date: </span>
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
                <Button option="link" className="font-medium text-neutral-700 mr-1">
                  View on Explorer
                </Button>
              </a>
            </p>
          </Card>
          <div className="flex justify-between !mt-4">
            <p className="flex items-center gap-1">
              <span className="ml-2">
                <Flag flag={displayed} className="w-5" />
              </span>
              <span className="font-medium text-neutral-700">Display status </span>
            </p>
            <div className="flex gap-1">
              <Button className="flex gap-2 items-center">
                <ArrowPathIcon className="w-7" />
                Display
              </Button>
              <Button onClick={() => setShowDetails(false)} option="alert" className="flex gap-2 items-center">
                Close
              </Button>
            </div>
          </div>
        </DetailsContent>
      </DetailsModal>
    </Card>
  );
};

export default Tip;
