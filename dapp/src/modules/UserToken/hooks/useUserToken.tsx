import { useContractRead } from 'wagmi';

export const useUserToken = (address: string) => {
  // const {
  //   user: { token },
  // } = useUser();
  // address = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

  //TODO add ABI
  //useMemo
  const contractInstance = {
    addressOrName: address,
    // contractInterface: UserToken.abi,
  } as any;

  // READ
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
    args: [''],
  });

  // WRITE

  return { totalSupply, decimals, balanceOf };
};
