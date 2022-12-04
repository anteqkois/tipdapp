import { Card, Flag, Tooltip } from '@/components/utils';
import { useClipboard, useModal } from '@/hooks';
import { dateFormat } from '@/lib/dayjs';
import cutAddress from '@/utils/cutAddress';
import { parseNotation } from '@/utils/format';
import { TipUI } from '@anteqkois/server';
import {
  ArrowPathIcon,
  ArrowsPointingOutIcon,
  AtSymbolIcon,
} from '@heroicons/react/24/outline';
import Avatar from '../utils/Avatar';
import Button from '../utils/Button';
// const { parseUnits, formatUnits } = ethers.utils;

// type Props { type: 'full'|'patial'}

const TipCard = ({
  txHash,
  amount,
  value,
  message,
  displayed,
  date,
  tipper,
  tipperAddress,
  tokenAddress,
  token,
}: TipUI) => {
  const [DetailsModal, DetailsContent, DetailsTrigger, setShowDetails] =
    useModal();
  const { ClipboardIcon } = useClipboard();

  return (
    <Card>
      {/* <div className="flex items-center justify-between w-full gap-1"> */}
      <div className="flex items-top w-full gap-1">
        <Avatar
          address={tipperAddress}
          className="w-6 h-6 mr-0.5"
        />
        <h5 className=" mr-3 lg:text-2xl">
          <AtSymbolIcon className="inline text-primary w-6 lg:w-7 " />
          <i className="text-primary">{tipper.nick} </i>
          {/* sent {ethers.utils.formatEther(amount)} */}
          sent {parseNotation(amount)}
          <i className="text-secondary "> ${token.symbol}</i>:
        </h5>
        <div className="flex gap-1.5 ml-auto max-h-7">
          <Tooltip content="Display again">
            <ArrowPathIcon className="w-7 p-0.5 rounded-full bg-neutral-150 animate-action" />
          </Tooltip>
          <Flag
            flag={displayed}
            tooltip="Displayed"
            className="w-7 h-7"
          />
        </div>
      </div>
      <p className="pt-2 pb-3 leading-tight max-w-4xl truncate">{message}</p>
      <div className="w-full mb-2">
        <h6 className=" text-primary font-semibold">Tip details:</h6>
        <p>
          <span className="font-medium text-neutral-light">Date: </span>
          {dateFormat(date).format('MMM DD YYYY, HH:MM')} (
          {dateFormat(date).fromNow()})
        </p>
        <p className="font-medium text-neutral-light">
          Token:
          <span className="font-normal text-neutral-500">
            {' '}
            {parseNotation(amount)} {token.symbol} ({parseNotation(value)}$)
          </span>
        </p>
      </div>
      <DetailsModal>
        <DetailsTrigger>
          <Button
            option="minimalist"
            className="h-7"
          >
            <ArrowsPointingOutIcon className="inline w-5 mr-1" />
            display details
          </Button>
        </DetailsTrigger>
        <DetailsContent
          title="Tip details"
          className="space-y-2"
        >
          <Card className="shadow-none text-neutral-800 !p-2">
            <h6 className="text-primary">Tipper&apos;s Message</h6>
            <p className="p-1 leading-tight max-w-4xl">{message}</p>
          </Card>
          <Card className="shadow-none text-neutral-800 !p-2">
            <h6 className="text-primary">Value and Token</h6>
            <p>
              <span className="font-medium text-neutral-700">Value: </span>
              {parseNotation(value)}$
            </p>
            <p>
              <span className="font-medium text-neutral-700">Symbol: </span>
              {token.symbol}
            </p>
            <p>
              <span className="font-medium text-neutral-700">Amount: </span>
              {parseNotation(amount)}
            </p>
            <p className="flex items-center  gap-1">
              <span className="font-medium ">Address: </span>
              {cutAddress(tokenAddress)}
              <ClipboardIcon
                copyData={tokenAddress}
                message="Address copied !"
              />
            </p>
            <a
              tabIndex={-1}
              href={`https://etherscan.io/token/${tipperAddress}`}
              target={'_blank'}
              rel="noreferrer"
            >
              <Button
                option="link"
                className="font-medium text-neutral-700 mr-1"
              >
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
              {cutAddress(tipperAddress)}
              <ClipboardIcon
                copyData={tipperAddress}
                message="Address copied !"
              />
            </p>
            <p className="flex items-end">
              <a
                tabIndex={-1}
                href={`https://etherscan.io/address/${tipperAddress}`}
                target={'_blank'}
                rel="noreferrer"
              >
                <Button
                  option="link"
                  className="font-medium text-neutral-700 mr-1"
                >
                  View on Explorer
                </Button>
              </a>
            </p>
          </Card>
          <Card className="shadow-none text-neutral-800 !p-2">
            <h6 className="text-primary">Transaction</h6>
            <p>
              <span className="font-medium text-neutral-700">Date: </span>
              {dateFormat(date).format('MMM DD YYYY, HH:MM')} (
              {dateFormat(date).fromNow()})
            </p>
            <p className="flex items-center  gap-1">
              <span className="font-medium ">Transaction Hash: </span>
              {cutAddress(txHash)}
              <ClipboardIcon
                copyData={txHash}
                message="Transaction hash copied !"
              />
            </p>
            <p className="flex items-end">
              <a
                tabIndex={-1}
                href={`https://etherscan.io/tx/${tipperAddress}`}
                target={'_blank'}
                rel="noreferrer"
              >
                <Button
                  option="link"
                  className="font-medium text-neutral-700 mr-1"
                >
                  View on Explorer
                </Button>
              </a>
            </p>
          </Card>
          <div className="flex justify-between !mt-4">
            <p className="flex items-center gap-1">
              <span className="ml-2">
                <Flag
                  flag={displayed}
                  className="w-5"
                />
              </span>
              <span className="font-medium text-neutral-700">
                Display status{' '}
              </span>
            </p>
            <div className="flex gap-1">
              <Button className="flex gap-2 items-center">
                <ArrowPathIcon className="w-6" />
                Display
              </Button>
              <Button
                onClick={() => setShowDetails(false)}
                option="danger"
                className="flex gap-2 items-center"
              >
                Close
              </Button>
            </div>
          </div>
        </DetailsContent>
      </DetailsModal>
    </Card>
  );
};

export default TipCard;
