import { ethers } from '@/lib';
import { dateFormat } from '@/lib/dayjs';
import { useClipboard, useMediaQuery } from '@/shared/hooks';
import { Card, ViewOnExplorer } from '@/shared/ui';
import { cutAddress } from '@/utils';
import { UserToken } from '@tipdapp/types';
import { useNetwork } from 'wagmi';
import { useUserToken } from '../hooks/useUserTokenContract';

type Props = {
  token: UserToken;
};

export const TokenPanel = ({ token }: Props) => {
  const isMobile = useMediaQuery<boolean>(
    ['(max-width: 1024px)'],
    [true],
    false
  );
  const { totalSupply, decimals } = useUserToken(token.address);
  console.log('token :>> ', token);
  const { ClipboardIcon } = useClipboard();
  const { chain } = useNetwork();

  return (
    <div className="grid gap-2 lg:gap-4">
      <Card className="flex flex-col gap-2">
        <h4>Token basic information</h4>
        <div>
          <p>
            <span className="font-medium">Name: </span>
            <span className="text-primary">{token.name}</span>
          </p>
          <p>
            <span className="font-medium">Symbol: </span>
            <span className="text-primary">{token.symbol}</span>
          </p>
          <p className="flex items-center  gap-1">
            <span className="font-medium">Address: </span>
            <span>{isMobile ? cutAddress(token.address) : token.address}</span>
            <ClipboardIcon
              copyData={token.address}
              message="Address copied !"
            />
          </p>
          <ViewOnExplorer
            subject="token"
            value={token.address}
          />
        </div>
      </Card>
      <Card className="flex flex-col gap-2">
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
            <span className="font-medium">Chain: </span>
            <span>{chain?.name}</span>
          </p>
          <p>
            <span className="font-medium">Minted tokens: </span>
            <span>{0} (Get from db minted amount)</span>
          </p>
          <p>
            <span className="font-medium">Burnt tokens: </span>
            <span>{0} (To implement)</span>
          </p>
          <p>
            <span className="font-medium">Holders: </span>
            <span>{0} (get from block explorer)</span>
          </p>
          <p>
            <span className="font-medium">Transfers: </span>
            <span>{0} ((get from block explorer))</span>
          </p>
        </div>
      </Card>
      <Card className="flex flex-col gap-2">
        <h4>Last transaction</h4>
        <div>
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
          <ViewOnExplorer
            subject="tx"
            value="0x2"
          />
        </div>
      </Card>
    </div>
  );
};
