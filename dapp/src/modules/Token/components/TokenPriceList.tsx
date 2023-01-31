import Image from 'next/image';
import { TokenCoinGecko } from '../types';

type Props = {
  tokens: TokenCoinGecko[];
  className?: string;
};
export const TokenPriceList = ({ tokens, className }: Props) => {
  console.log('tokens', tokens)
  return (
    <table
      className={`table-auto rounded bg-neutral-50 p-4 ring-1 ring-inset ring-neutral-600 ring-opacity-10 ${className}`}
      id="tokenPrices"
    >
      <thead>
        <tr className="">
          <th className="rounded-tl bg-primary p-2 text-left text-neutral-150">
            Name
          </th>
          <th className="rounded-tr bg-primary p-2 text-left text-neutral-150">
            Last price
          </th>
        </tr>
      </thead>
      <tbody>
        {tokens.map(({ image, symbol, current_price, name, id }) => (
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
            <p className="px-2 py-1 text-xs italic">
              *Prices are updated every 2 minutes.
            </p>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
