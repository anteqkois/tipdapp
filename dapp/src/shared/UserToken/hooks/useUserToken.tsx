import { ethereum } from '@/utils/constants';
import { UserTokenAbi } from '@tipdapp/contracts';
import { useMemo, useState } from 'react';
import { Address, useContractRead } from 'wagmi';

export const useUserToken = (userTokenAddress: Address) => {
  const [balanceOfAddress, setBalanceOfAddress] = useState<Address>(
    ethereum.AddressZero
  );
  const contractInstance = useMemo(
    () => ({ address: userTokenAddress, abi: UserTokenAbi }),
    [userTokenAddress]
  );

  //TODO get info from etherscan/transfermarketcap (create hooks to do it)

  // READ
  const symbol = useContractRead({
    ...contractInstance,
    functionName: 'symbol',
  });

  const name = useContractRead({
    ...contractInstance,
    functionName: 'name',
  });

  const totalSupply = useContractRead({
    ...contractInstance,
    functionName: 'totalSupply',
  });

  const decimals = useContractRead({
    ...contractInstance,
    functionName: 'decimals',
  });

  const balanceOf = useContractRead({
    ...contractInstance,
    functionName: 'balanceOf',
    args: [balanceOfAddress],
    enabled: balanceOfAddress !== ethereum.AddressZero,
  });
  const balanceOfCall = (address: Address) => setBalanceOfAddress(address);

  // WRITE

  return {
    symbol,
    name,
    totalSupply,
    decimals,
    balanceOf: { ...balanceOf, call: balanceOfCall },
  };
};
