import { dateFormat } from '@/lib/dayjs';
import { useClipboard, useMediaQuery } from '@/shared/hooks';
import { cutAddress } from '@/utils';
import { ethers } from '@/lib';
import { Button, Card } from '@/shared/ui';
import { UserToken } from '@tipdapp/server';
import { useUserToken } from '../hooks/useUserToken';

type Props = {
  token: UserToken;
};

export const TokenPanel = ({ token }: Props) => {
  const isMobile = useMediaQuery<boolean>(
    ['(max-width: 1024px)'],
    [true],
    true
  );
  const { totalSupply, decimals } = useUserToken(token.address);
  const { ClipboardIcon } = useClipboard();
  // console.log(totalSupply.data);
  // console.log(decimals.data);
  // console.log(balanceOf.data);

  return (
    <div className="grid gap-2 lg:gap-4">
      <Card>
        <h4>Your token basic information</h4>
        <div>
          <h6>
            <span className="font-medium">Name: </span>
            <span className="text-primary">{token.name}</span>
          </h6>
          <h6>
            <span className="font-medium">Symbol: </span>
            <span>{token.symbol}</span>
          </h6>
          <h6 className="flex items-center  gap-1">
            <span className="font-medium ">Address: </span>
            {isMobile ? cutAddress(token.address) : token.address}
            <ClipboardIcon
              copyData={token.address}
              message="Address copied !"
            />
          </h6>
          <p className="flex items-end">
            <a
              tabIndex={-1}
              href={`https://etherscan.io/token/${token.address}`}
              target={'_blank'}
              rel="noreferrer"
            >
              <Button
                variant="link"
                className="font-medium text-neutral-700 mr-1"
              >
                View token on Explorer
              </Button>
            </a>
          </p>
        </div>
      </Card>
      <Card>
        <h4>Details/Analist</h4>
        <div>
          <p>
            <span className="font-medium">Decimals: </span>
            <span>{decimals.data}</span>
          </p>
          <p>
            <span className="font-medium">Total supply: </span>
            <span>{ethers.utils.formatUnits(totalSupply.data ?? '0')}</span>
          </p>
          <p>
            <span className="font-medium">Burnt token: </span>
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
        </div>
      </Card>
      <Card>
        <h4>Last transaction</h4>
        <p>
          <span className="font-medium">Date: </span>
          <span>
            {dateFormat('2024-07-12T12:33:45.758Z').format(
              'MMM DD YYYY, HH:MM'
            )}{' '}
            <i>({dateFormat('2024-07-12T12:33:45.758Z').fromNow()})</i>
          </span>
        </p>
        <p className="flex items-center  gap-1">
          <span className="font-medium ">Hash: </span>
          {isMobile ? cutAddress(token.address) : token.address}
          <ClipboardIcon
            copyData={token.address}
            message="Address copied !"
          />
        </p>
        <p className="flex items-end">
          <a
            tabIndex={-1}
            href="https://zksync2-testnet.zkscan.io/address/0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266/transactions"
            target={'_blank'}
            rel="noreferrer"
          >
            <Button
              variant="link"
              className="font-medium text-neutral-700 mr-1"
            >
              View transaction on Explorer
            </Button>
          </a>
        </p>
      </Card>
    </div>
  );
};
