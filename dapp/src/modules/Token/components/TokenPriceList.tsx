import Image from 'next/image';

type TokenCoinGecko = {
  id: string;
  name: string;
  image: string;
  symbol: string;
  current_price: number;
};
type Props = {
  tokens: TokenCoinGecko[];
  className?: string;
};
export const TokenPriceList = ({ tokens, className }: Props) => {
  return (
    <table
      className={`table-auto p-4 bg-neutral-50 rounded ring-1 ring-inset ring-neutral-600 ring-opacity-10 ${className}`}
      id="tokenPrices"
    >
      <thead>
        <tr className="">
          <th className="p-2 text-left rounded-tl bg-primary-600 text-neutral-150">
            Name
          </th>
          <th className="p-2 text-left rounded-tr bg-primary-600 text-neutral-150">
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
            <p className="px-2 py-1 italic text-xs">
              *Prices are updated every 30 seconds.
            </p>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
