import { Address } from '@wagmi/core';
import { useBalance } from 'wagmi';

type Props = {
  address: Address;
  chainId: number;
  tokenAddress?: Address;
};

export const TokenBalance = ({ address, chainId = 1, tokenAddress }: Props) => {
  const { data, isError, isLoading } = useBalance({
    address,
    chainId,
    token: tokenAddress,
  });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;

  return (
    <div>
      {/* <Suspense fallback={<Spinner />}> */}
      {data && (
        <div className="">
          <p className="">
            Balance: {data.formatted} {data.symbol}
          </p>
        </div>
      )}
      {/* │ Run the following to update │ │ npm i --save-dev prisma@latest │ │ npm i @prisma/client@latest */}
      {/* </Suspense> */}
    </div>
  );
};
