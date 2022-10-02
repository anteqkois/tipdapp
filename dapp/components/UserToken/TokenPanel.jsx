import { useClipboard, useMediaQuery } from '@/hooks';
import { dateFormat } from '@/lib/dayjs';
import cutAddress from '@/utils/cutAddress';
import { Button, Card } from '../utils';

export const TokenPanel = () => {
  // address String @id @unique @db.VarChar(42)
  // symbol  String @unique
  // name    String @unique
  // chainId Int
  const isMobile = useMediaQuery('(max-width: 1024px)', true);
  const { ClipboardIcon, handleCopy } = useClipboard();

  const userToken = {
    address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    date: '2024-07-12T12:33:45.758Z',
  };

  return (
    <div className="grid gap-2 lg:gap-4">
      <Card>
        <h4>Your token basic information</h4>
        <div>
          <p>
            <span className="font-medium">Name: </span>
            <span className="text-primary">{'ANQSwap'}</span>
          </p>
          <p>
            <span className="font-medium">Symbol: </span>
            <span>{'ANQ'}</span>
          </p>
          <p className="flex items-center  gap-1">
            <span className="font-medium ">Address: </span>
            {isMobile ? cutAddress(userToken.address) : userToken.address}
            <ClipboardIcon copyData={userToken.address} message="Address copied !" />
          </p>
          <p className="flex items-end">
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
          </p>
          <p>
            <span className="font-medium">Decimals: </span>
            <span>{'18'}</span>
          </p>
        </div>
      </Card>
      <Card>
        <h4>Details/Analist</h4>
        <div>
          <p>
            <span className="font-medium">Total Supply: </span>
            <span>{123231123}</span>
          </p>
          <p>
            <span className="font-medium">USD Value: </span>
            <span>{123231123}</span>
          </p>
          <p>
            <span className="font-medium">Holders: </span>
            <span>{12000}</span>
          </p>
          <p>
            <span className="font-medium">Last Transaction date: </span>
            <i>
              {dateFormat(userToken.date).format('MMM DD YYYY, HH:MM')} ({dateFormat(userToken.date).fromNow()})
            </i>
          </p>
          <p className="flex items-center  gap-1">
            <span className="font-medium ">Last Transaction: </span>
            {isMobile ? cutAddress(userToken.address) : userToken.address}
            <ClipboardIcon copyData={userToken.address} message="Address copied !" />
          </p>
          <p className="flex items-end">
            <a
              tabIndex="-1"
              href="https://zksync2-testnet.zkscan.io/address/0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266/transactions"
              target={'_blank'}
              rel="noreferrer"
            >
              <Button option="link" className="font-medium text-neutral-700 mr-1">
                View transaction on Explorer
              </Button>
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
};
