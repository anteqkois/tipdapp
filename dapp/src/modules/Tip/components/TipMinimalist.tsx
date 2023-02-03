import { dateFormat } from '@/lib/dayjs';
import { useClipboard, useModal } from '@/shared/hooks';
import { Button, Card, Flag, Tooltip } from '@/shared/ui';
import Avatar from '@/shared/User/components/Avatar';
import { cutAddress, parseNotation } from '@/utils';
import {
  ArrowPathIcon,
  ArrowsPointingOutIcon,
  AtSymbolIcon,
} from '@heroicons/react/24/outline';
import { TipUI } from '@tipdapp/database';

const TipMinimalist = ({
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
      <div className="items-top flex w-full gap-1">
        <Avatar
          address={tipperAddress}
          className="mr-0.5 h-6 w-6"
        />
        <h5 className=" mr-3 lg:text-2xl">
          <AtSymbolIcon className="inline w-6 text-primary lg:w-7 " />
          <i className="text-primary">{tipper.nick} </i>
          {/* sent {ethers.utils.formatEther(amount)} */}
          sent {parseNotation(amount)}
          <i className="text-secondary "> ${token.symbol}</i>:
        </h5>
        <div className="ml-auto flex max-h-7 gap-1.5">
          <Tooltip content="Display again">
            <ArrowPathIcon className="animate-action w-7 rounded-full bg-neutral-150 p-0.5" />
          </Tooltip>
          <Flag
            flag={displayed}
            tooltip="Displayed"
            className="h-7 w-7"
          />
        </div>
      </div>
      <p className="max-w-4xl truncate pt-2 pb-3 leading-tight">{message}</p>
      <div className="mb-2 w-full">
        <h6 className=" font-semibold text-primary">Tip details:</h6>
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
            variant="minimalist"
            className="h-7"
          >
            <ArrowsPointingOutIcon className="mr-1 inline w-5" />
            display details
          </Button>
        </DetailsTrigger>
        <DetailsContent
          title="Tip details"
          className="space-y-2"
        >
          <Card className="!p-2 text-neutral-800 shadow-none">
            <h6 className="text-primary">Tipper&apos;s Message</h6>
            <p className="max-w-4xl p-1 leading-tight">{message}</p>
          </Card>
          <Card className="!p-2 text-neutral-800 shadow-none">
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
                variant="link"
                className="mr-1 font-medium text-neutral-700"
              >
                View token on Explorer
              </Button>
            </a>
          </Card>
          <Card className="!p-2 text-neutral-800 shadow-none">
            <h6 className="text-primary">Tipper</h6>
            <p className="flex items-end ">
              <span className="mr-1 font-medium">Nick: </span>
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
                  variant="link"
                  className="mr-1 font-medium text-neutral-700"
                >
                  View on Explorer
                </Button>
              </a>
            </p>
          </Card>
          <Card className="!p-2 text-neutral-800 shadow-none">
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
                  variant="link"
                  className="mr-1 font-medium text-neutral-700"
                >
                  View on Explorer
                </Button>
              </a>
            </p>
          </Card>
          <div className="!mt-4 flex justify-between">
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
              <Button className="flex items-center gap-2">
                <ArrowPathIcon className="w-6" />
                Display
              </Button>
              <Button
                onClick={() => setShowDetails(false)}
                variant="danger"
                className="flex items-center gap-2"
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

export default TipMinimalist;
