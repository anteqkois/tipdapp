import CoinGeckoLogo from '@/assets/coinGeckoLogo.svg';
import { Link } from '@/shared/ui';
import Image from 'next/image';
import { TokenCoinGecko } from '../types';

type Props = {
  tokens: TokenCoinGecko[];
  className?: string;
};
export const TokenPriceList = ({ tokens, className }: Props) => (
  <table
    className={`table-auto rounded bg-neutral-50 p-4 ring-1 ring-inset ring-neutral-600 ring-opacity-10 ${className}`}
    id="tokenPrices"
  >
    <thead>
      <tr className="">
        <th className="rounded-tl bg-primary p-2 text-left text-neutral-150">
          Name
        </th>
        <th className="flex items-center justify-between rounded-tr bg-primary p-2 text-left text-neutral-150">
          Last price
          {/* <span className='text-xs'>*Data provided by CoinGecko</span> */}
        </th>
      </tr>
    </thead>
    <tbody>
      {tokens.map(({ image, current_price, name, id }) => (
        <tr
          key={name}
          className="odd:bg-neutral-150"
        >
          <td>
            <a
              href={`https://coinmarketcap.com/currencies/${id}`}
              className="flex items-center gap-2 p-2"
            >
              <Image
                height={24}
                width={24}
                className="rounded-full"
                alt={name}
                src={image}
              />
              {name}
            </a>
          </td>
          <td className="p-2">
            <a href={`https://coinmarketcap.com/currencies/${id}`}>
              ${current_price}
            </a>
          </td>
        </tr>
      ))}
    </tbody>
    <tfoot>
      <tr>
        <td
          colSpan={2}
          className="border-t border-t-neutral-600/10"
        >
          <div className="px-2 py-1 text-xs italic leading-none">
            <p className="inline-flex items-center gap-1 text-xs">
              *Data provided by
              <Link
                href="https://www.coingecko.com"
                className="inline-flex items-center gap-1"
              >
                <CoinGeckoLogo className="inline-block h-4" />
                CoinGecko.
              </Link>
            </p>
            <p className="pl-1 text-xs">Prices are updated every 2 minutes.</p>
          </div>
        </td>
      </tr>
    </tfoot>
  </table>
);
